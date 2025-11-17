import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RefreshIcon from "@mui/icons-material/Refresh";

const ImageViewer = ({ imageUrl }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
      }}
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        centerOnInit={true}
        wheel={{ step: 0.2 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="d-flex flex-column align-items-center w-100">
            {/* Toolbar */}
            <div
              className="position-absolute top-0 mt-3 d-flex gap-3 bg-dark bg-opacity-75 rounded p-2 shadow"
              style={{
                zIndex: 1100,
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Button
                variant="contained"
                startIcon={<ZoomInIcon />}
                onClick={() => zoomIn()}
                className="fw-bold text-capitalize"
                style={{
                  backgroundColor: "#7E00D1",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6b00b5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7E00D1")
                }
              >
                Zoom In
              </Button>

              <Button
                variant="contained"
                startIcon={<ZoomOutIcon />}
                onClick={() => zoomOut()}
                className="fw-bold text-capitalize"
                style={{
                  backgroundColor: "#7E00D1",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6b00b5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7E00D1")
                }
              >
                Zoom Out
              </Button>

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={() => resetTransform()}
                className="fw-bold text-capitalize"
                style={{
                  backgroundColor: "#616161",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4e4e4e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#616161")
                }
              >
                Reset
              </Button>
            </div>

            {/* Image */}
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
              <img
                src={imageUrl}
                alt="Preview"
                className="img-fluid rounded shadow-lg"
                style={{
                  maxHeight: "90vh",
                  maxWidth: "90vw",
                  objectFit: "contain",
                  cursor: "grab",
                }}
                draggable={false}
                onError={() => console.error("Error loading image:", imageUrl)}
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;
