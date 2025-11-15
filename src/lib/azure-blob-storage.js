import { BlobServiceClient } from "@azure/storage-blob";
import mime from "mime-types";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME || "blog-images";

// Only log during runtime, not during build
if (process.env.NODE_ENV === 'production' && connectionString) {
  console.log('[AZURE] Azure Storage Configuration:');
  console.log('[AZURE] Container Name:', containerName);
  console.log('[AZURE] Connection String Length:', connectionString?.length || 0);
}

// Validate required environment variables
function validateEnvironment() {
  if (!connectionString) {
    throw new Error(
      "Azure Storage Connection String is not configured. Please set AZURE_STORAGE_CONNECTION_STRING environment variable."
    );
  }

  if (!containerName) {
    throw new Error(
      "Azure Container Name is not configured. Please set AZURE_CONTAINER_NAME environment variable."
    );
  }
}

// Lazily initialize the blob service client only when needed
let blobServiceClient = null;
let containerClient = null;

function initializeAzureClients() {
  validateEnvironment();

  if (!blobServiceClient) {
    try {
      console.log('[AZURE] Initializing Azure Blob Storage client...');

      blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      containerClient = blobServiceClient.getContainerClient(containerName);

      console.log('[AZURE] Azure Blob Storage client initialized successfully');
    } catch (error) {
      console.error('[AZURE] Failed to initialize Azure Blob Storage client:', error.message);
      console.error('[AZURE] Error details:', error);
      throw new Error(`Failed to initialize Azure Blob Storage: ${error.message}`);
    }
  }

  return containerClient;
}

export async function uploadImageToAzure(fileBuffer, originalFilename, blogId) {
  const requestId = Math.random().toString(36).substring(2, 15);

  try {
    console.log('[AZURE] Starting Azure Blob Storage upload', {
      requestId,
      originalFilename,
      blogId,
      fileSize: fileBuffer.length,
    });

    // Validate inputs
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('File buffer is empty or invalid');
    }

    if (!originalFilename) {
      throw new Error('Original filename is required');
    }

    if (!blogId) {
      throw new Error('Blog ID is required');
    }

    // Only initialize Azure clients when actually uploading
    console.log('[AZURE] Initializing Azure clients...');
    const container = initializeAzureClients();

    const fileExtension = originalFilename.split(".").pop();
    const newFilename = `${blogId}.${fileExtension}`;
    const contentType = mime.lookup(newFilename) || "application/octet-stream";

    console.log('[AZURE] Uploading file to Azure:', {
      requestId,
      newFilename,
      contentType,
      fileExtension,
    });

    const blockBlobClient = container.getBlockBlobClient(newFilename);

    // Check if blob already exists
    const exists = await blockBlobClient.exists();
    if (exists) {
      console.log('[AZURE] Blob already exists, overwriting:', newFilename);
    }

    console.log('[AZURE] Uploading data to blob...');
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: contentType },
      metadata: {
        originalFilename,
        blogId: blogId.toString(),
        uploadedAt: new Date().toISOString(),
      },
    });

    const blobUrl = blockBlobClient.url;
    console.log('[AZURE] Azure Blob Storage upload completed:', blobUrl);

    return blobUrl;
  } catch (error) {
    console.error('[AZURE] Azure Blob Storage upload failed:', error.message);
    console.error('[AZURE] Error details:', {
      name: error.name,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack
    });

    // Provide more specific error messages
    if (error.message.includes('AuthenticationFailed')) {
      throw new Error('Azure Storage authentication failed. Check your connection string.');
    } else if (error.message.includes('ContainerNotFound')) {
      throw new Error(`Azure Storage container '${containerName}' not found.`);
    } else if (error.message.includes('NetworkError') || error.message.includes('ECONNRESET')) {
      throw new Error('Network error while uploading to Azure Storage. Please try again.');
    } else {
      throw new Error(`Failed to upload image to Azure Storage: ${error.message}`);
    }
  }
}

// Health check function for Azure Blob Storage
export async function checkAzureStorageHealth() {
  try {
    console.log('[AZURE] Running health check...');
    const container = initializeAzureClients();

    // Try to list blobs to verify connection
    let blobCount = 0;
    for await (const _ of container.listBlobsFlat({ maxPageSize: 1 })) {
      blobCount++;
      break;
    }

    console.log('[AZURE] Health check passed');

    return {
      status: 'healthy',
      containerName,
      connectionStringConfigured: !!connectionString,
    };
  } catch (error) {
    console.error('[AZURE] Health check failed:', error.message);

    return {
      status: 'unhealthy',
      error: error.message,
      containerName,
      connectionStringConfigured: !!connectionString,
    };
  }
}
