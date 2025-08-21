import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, ZoomIn, ZoomOut, Delete } from "lucide-react";
import imageUploaderStyles from "../../../css/imageUploaderStyles";
import { configureImagePosition } from "../../../utils/imageUtils";

export default function ImageUploader({ value }) {
  const [preview, setPreview] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [newImageUploaded, setNewImageUploaded] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [transformStart, setTransformStart] = useState({
    translateX: 0,
    translateY: 0,
  });
  const {
    scaleTextStyle,
    scaleDisplayStyle,
    controlButtonStyle,
    controlsStyle,
    placeholderStyle,
    imageStyle,
    circularFrameStyle,
    previewSectionStyle,
    uploaderStyle,
    hiddenInputStyle,
    containerStyle,
  } = imageUploaderStyles(isDragging, preview, imageTransform);
  const fileInputRef = useRef(null);
  const imageDimensionsRef = useRef(imageDimensions);
  const imageTransformRef = useRef(imageTransform);

  const handleMouseDown = useCallback(
    (e) => {
      if (!preview) return;

      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
      setTransformStart({
        translateX: imageTransform.translateX,
        translateY: imageTransform.translateY,
      });

      e.preventDefault();
    },
    [preview, imageTransform]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setImageTransform((prev) => ({
        ...prev,
        translateX: transformStart.translateX + deltaX,
        translateY: transformStart.translateY + deltaY,
      }));
    },
    [isDragging, dragStart, transformStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setImageTransform(configureImagePosition(200, imageDimensionsRef.current, imageTransformRef.current));
  }, []);

  const handleZoom = (direction) => {
    setImageTransform((prev) => ({
      ...prev,
      scale:
        direction === "in"
          ? Math.min(prev.scale * 1.2, 5)
          : Math.max(prev.scale / 1.2, 0.2),
    }));
  };

  useEffect(() => {
    if (value) {
      setImageStates(value);
    }
  }, [value]);

  useEffect(() => {
    imageDimensionsRef.current = imageDimensions;
    imageTransformRef.current = imageTransform;

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    imageDimensions,
    imageTransform,
  ]);

  function setImageStates(value) {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.width,
        height: img.height,
      });

      // Calculate how object-contain scales the image within the 200x200 container
      const containerSize = 200;
      const imageAspect = img.width / img.height;
      const containerAspect = 1; // square container

      let containScale;
      if (imageAspect > containerAspect) {
        // Wide image: limited by width
        containScale = containerSize / img.width;
      } else {
        // Tall image: limited by height
        containScale = containerSize / img.height;
      }

      // The displayed size after object-contain
      const displayedWidth = img.width * containScale;
      const displayedHeight = img.height * containScale;

      // Calculate additional scale needed to fill the container with the shortest side
      const fillScale = Math.max(
        containerSize / displayedWidth,
        containerSize / displayedHeight
      );

      setImageTransform({
        scale: fillScale,
        translateX: 0,
        translateY: 0,
      });
    };
    img.src = value;
    setPreview(value);
  }

  function handleDelete() {
    setPreview(null);
    setDeleted(true);
    setImageDimensions({
      width: 0,
      height: 0,
    });
    setImageTransform({
      scale: 1,
      translateX: 0,
      translateY: 0,
    });
  }

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageStates(e.target.result);
        if (deleted) {
          setNewImageUploaded(true)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div style={containerStyle}>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          id="image"
          onChange={handleUpload}
          style={hiddenInputStyle}
        />
        <input type="hidden" name="preview" value={preview} />
        <input type="hidden" name="newImage" value={newImageUploaded} />
        <input
          type="hidden"
          name="imageDimensions"
          value={JSON.stringify(imageDimensions)}
        />
        <input
          type="hidden"
          name="imageTransform"
          value={JSON.stringify(imageTransform)}
        />
      </div>
      <div style={previewSectionStyle}>
        <div style={{ position: "relative" }}>
          <div
            style={circularFrameStyle}
            onMouseDown={handleMouseDown}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={imageStyle}
                draggable={false}
              />
            ) : (
              <div style={placeholderStyle}>
                <div
                  style={uploaderStyle}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={48} style={{ margin: "0 auto 8px auto" }} />
                  <p>Upload an image</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {preview && (
          <div style={controlsStyle}>
            <button
              type="button"
              onClick={() => handleZoom("out")}
              style={controlButtonStyle}
              title="Zoom Out"
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d5db")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            >
              <ZoomOut size={20} />
            </button>
            <div style={scaleDisplayStyle}>
              <span style={scaleTextStyle}>
                {Math.round(imageTransform.scale * 100)}%
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleZoom("in")}
              style={controlButtonStyle}
              title="Zoom In"
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d5db")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            >
              <ZoomIn size={20} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              style={controlButtonStyle}
              title="Delete"
              onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            >
              <Delete size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
