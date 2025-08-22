export async function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
}

export function configureImagePosition(size, dimensions, transformation) {
  const containerSize = size;
  const imageDimensions = dimensions;
  const imageTransform = transformation;
  const imageAspect = imageDimensions.width / imageDimensions.height;

  // Calculate how object-contain scales the image
  let containScale;
  if (imageAspect > 1) {
    containScale = containerSize / imageDimensions.width;
  } else {
    containScale = containerSize / imageDimensions.height;
  }

  // Get current displayed dimensions after all transforms
  const baseDisplayedWidth = imageDimensions.width * containScale;
  const baseDisplayedHeight = imageDimensions.height * containScale;
  const currentDisplayedWidth = baseDisplayedWidth * imageTransform.scale;
  const currentDisplayedHeight = baseDisplayedHeight * imageTransform.scale;

  // Current image bounds relative to container center
  const currentLeft = -currentDisplayedWidth / 2 + imageTransform.translateX;
  const currentRight = currentDisplayedWidth / 2 + imageTransform.translateX;
  const currentTop = -currentDisplayedHeight / 2 + imageTransform.translateY;
  const currentBottom = currentDisplayedHeight / 2 + imageTransform.translateY;

  // Container bounds (centered at origin)
  const containerLeft = -containerSize / 2;
  const containerRight = containerSize / 2;
  const containerTop = -containerSize / 2;
  const containerBottom = containerSize / 2;

  let newTranslateX = imageTransform.translateX;
  let newTranslateY = imageTransform.translateY;
  let newScale = imageTransform.scale;

  // Check if we need to scale up to eliminate empty space
  const scaleNeededX =
    currentDisplayedWidth < containerSize
      ? containerSize / currentDisplayedWidth
      : 1;
  const scaleNeededY =
    currentDisplayedHeight < containerSize
      ? containerSize / currentDisplayedHeight
      : 1;
  const scaleNeeded = Math.max(scaleNeededX, scaleNeededY);

  if (scaleNeeded > 1) {
    // Scale up to eliminate empty space
    newScale = imageTransform.scale * scaleNeeded;

    // Recalculate dimensions after scaling
    const scaledDisplayedWidth = baseDisplayedWidth * newScale;
    const scaledDisplayedHeight = baseDisplayedHeight * newScale;

    // Keep the same relative position but adjust for new scale
    newTranslateX = imageTransform.translateX * scaleNeeded;
    newTranslateY = imageTransform.translateY * scaleNeeded;

    // Update bounds with new scale
    const scaledLeft = -scaledDisplayedWidth / 2 + newTranslateX;
    const scaledRight = scaledDisplayedWidth / 2 + newTranslateX;
    const scaledTop = -scaledDisplayedHeight / 2 + newTranslateY;
    const scaledBottom = scaledDisplayedHeight / 2 + newTranslateY;

    // Adjust position to eliminate empty space
    if (scaledLeft > containerLeft) {
      newTranslateX = newTranslateX - (scaledLeft - containerLeft);
    } else if (scaledRight < containerRight) {
      newTranslateX = newTranslateX + (containerRight - scaledRight);
    }

    if (scaledTop > containerTop) {
      newTranslateY = newTranslateY - (scaledTop - containerTop);
    } else if (scaledBottom < containerBottom) {
      newTranslateY = newTranslateY + (containerBottom - scaledBottom);
    }
  } else {
    // Image is already large enough, just adjust position
    if (currentLeft > containerLeft) {
      // Move left to eliminate right-side empty space
      newTranslateX = newTranslateX - (currentLeft - containerLeft);
    } else if (currentRight < containerRight) {
      // Move right to eliminate left-side empty space
      newTranslateX = newTranslateX + (containerRight - currentRight);
    }

    if (currentTop > containerTop) {
      // Move up to eliminate bottom empty space
      newTranslateY = newTranslateY - (currentTop - containerTop);
    } else if (currentBottom < containerBottom) {
      // Move down to eliminate top empty space
      newTranslateY = newTranslateY + (containerBottom - currentBottom);
    }
  }

  return {
    scale: newScale,
    translateX: newTranslateX,
    translateY: newTranslateY,
  };
}

export async function getCroppedImage(
  originalImage,
  imageDimensions,
  imageTransform
) {
  if (!originalImage) return null;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const containerSize = 200;
        const outputSize = containerSize * 2;

        // Set output canvas size
        canvas.width = outputSize;
        canvas.height = outputSize;

        // Calculate the current transform values
        const imageAspect = imageDimensions.width / imageDimensions.height;

        // Calculate how object-contain scales the original image
        let containScale;
        if (imageAspect > 1) {
          containScale = containerSize / imageDimensions.width;
        } else {
          containScale = containerSize / imageDimensions.height;
        }

        // Calculate the displayed dimensions after object-contain
        const baseDisplayedWidth = imageDimensions.width * containScale;
        const baseDisplayedHeight = imageDimensions.height * containScale;

        // Apply user's transform
        const finalDisplayedWidth = baseDisplayedWidth * imageTransform.scale;
        const finalDisplayedHeight = baseDisplayedHeight * imageTransform.scale;

        // Calculate the crop area in original image coordinates
        const scaleRatio = imageDimensions.width / finalDisplayedWidth;

        // The visible area in the container maps to this area in the scaled image
        const cropWidth = containerSize * scaleRatio;
        const cropHeight = containerSize * scaleRatio;

        // Calculate the center point of the crop in original image coordinates
        const centerX =
          imageDimensions.width / 2 - imageTransform.translateX * scaleRatio;
        const centerY =
          imageDimensions.height / 2 - imageTransform.translateY * scaleRatio;

        // Calculate crop bounds
        const cropX = centerX - cropWidth / 2;
        const cropY = centerY - cropHeight / 2;

        // Draw the cropped image onto the canvas
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight, // Source crop area
          0,
          0,
          outputSize,
          outputSize // Destination area (full canvas)
        );

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          "image/jpeg",
          0.9
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = originalImage;
  });
}

export async function getBlob(values) {
  const preview = values.preview;
  const imageDimensions = JSON.parse(values.imageDimensions);
  const imageTransform = JSON.parse(values.imageTransform);

  const blob = await getCroppedImage(preview, imageDimensions, imageTransform);
  return blob;
}
