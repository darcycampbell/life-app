export default function imageUploaderStyles(
  isDragging,
  preview,
  imageTransform
) {
  const containerStyle = {
    maxWidth: "512px",
    margin: "0 auto",
    marginBottom: "20px",
    padding: "24px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "24px",
    textAlign: "center",
  };

  const hiddenInputStyle = {
    display: "none",
  };

  const uploadButtonStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const previewSectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  const circularFrameStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid #d1d5db",
    backgroundColor: "#f3f4f6",
    position: "relative",
    cursor: isDragging ? "grabbing" : preview ? "grab" : "default",
  };

  const imageStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    userSelect: "none",
    transform: `scale(${imageTransform.scale}) translate(${
      imageTransform.translateX / imageTransform.scale
    }px, ${imageTransform.translateY / imageTransform.scale}px)`,
    transformOrigin: "center center",
  };

  const placeholderStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    textAlign: "center",
  };

  const uploaderStyle = {
    cursor: "pointer",
  };

  const controlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const controlButtonStyle = {
    padding: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const smartConfigButtonStyle = {
    ...controlButtonStyle,
    backgroundColor: "#3b82f6",
    color: "white",
    marginLeft: "16px",
  };

  const scaleDisplayStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 12px",
    backgroundColor: "#f3f4f6",
    borderRadius: "20px",
  };

  const scaleTextStyle = {
    fontSize: "14px",
    fontWeight: "500",
  };

  const instructionsStyle = {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    maxWidth: "384px",
  };

  const instructionParagraphStyle = {
    marginBottom: "8px",
  };

  const debugSectionStyle = {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  };

  const debugTitleStyle = {
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  };

  const debugTextStyle = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "4px",
  };

  const styles = {
    debugTextStyle,
    debugTitleStyle,
    debugSectionStyle,
    instructionParagraphStyle,
    instructionsStyle,
    scaleTextStyle,
    scaleDisplayStyle,
    smartConfigButtonStyle,
    controlButtonStyle,
    controlsStyle,
    placeholderStyle,
    imageStyle,
    circularFrameStyle,
    previewSectionStyle,
    uploadButtonStyle,
    uploaderStyle,
    hiddenInputStyle,
    containerStyle,
    titleStyle,
  };

  return styles;
}
