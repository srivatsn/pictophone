import React, { Component, createRef, MouseEvent, TouchEvent } from 'react';
import './App.css';

interface DrawingCanvasState {
    history: ImageData[];
    isReadOnly: boolean;
    canvasImage: string | null;
}

interface DrawingCanvasProps {
    editable?: boolean;
}

class DrawingCanvas extends Component<DrawingCanvasProps, DrawingCanvasState> {
    private canvasRef = createRef<HTMLCanvasElement>();
    private isDrawing = false;

    constructor(props: DrawingCanvasProps) {
        super(props);
        this.state = {
            history: [],
            isReadOnly: !props.editable,
            canvasImage: null,
        };
    }

    /**
     * Lifecycle method called after the component has been mounted.
     * Initializes the canvas and fills it with a white background.
     */
    componentDidMount() {
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                this.fillCanvasWhite(context);
            }
        }
    }

    componentDidUpdate(prevProps: DrawingCanvasProps) {
        if (prevProps.editable !== this.props.editable) {
            if (this.props.editable === false && this.canvasRef.current) {
                // Capture the canvas image before switching to read-only mode
                const canvas = this.canvasRef.current;
                this.setState({ canvasImage: canvas.toDataURL() }, () => {
                    this.setState({ isReadOnly: true });
                });
            } else if (this.props.editable === true) {
                // Switch back to editable mode and clear the canvas
                this.setState({ isReadOnly: false }, () => {
                    const canvas = this.canvasRef.current;
                    const context = canvas?.getContext('2d');
                    if (context) {
                        this.fillCanvasWhite(context);
                        this.setState({ history: [] });
                    }
                });
            }
        }
    }

    /**
     * Fills the canvas with white color.
     * 
     * @param {CanvasRenderingContext2D} context - The rendering context of the canvas.
     */
    fillCanvasWhite(context: CanvasRenderingContext2D) {
        const canvas = this.canvasRef.current;
        if (canvas) {
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
        if (this.state.isReadOnly) return;
        this.startDrawing(event.clientX, event.clientY);
    };

    handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!this.isDrawing || this.state.isReadOnly) return;
        this.draw(event.clientX, event.clientY);
    };

    /**
     * Handles the mouse up event.
     * If the canvas is currently being drawn on, it saves the current state of the canvas to the history.
     * @returns void
     */
    handleMouseUp = () => {
        if (!this.isDrawing || this.state.isReadOnly) return;
        this.stopDrawing();

    };

    handleTouchStart = (event: TouchEvent) => {
        if (this.state.isReadOnly) return;
        this.isDrawing = true;
        const touch = event.touches[0];
        this.startDrawing(touch.clientX, touch.clientY);
    };

    handleTouchMove = (event: TouchEvent) => {
        if (!this.isDrawing || this.state.isReadOnly) return;
        const touch = event.touches[0];
        this.draw(touch.clientX, touch.clientY);
    };

    handleTouchEnd = () => {
        if (this.state.isReadOnly) return;
        this.stopDrawing();
    };

    startDrawing = (x: number, y: number) => {
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
        context.beginPath();
        this.isDrawing = true;
    };

    draw = (x: number, y: number) => {
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
        context.stroke();
    };

    stopDrawing = () => {
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        this.setState((prevState) => ({
            history: [
                ...prevState.history,
                context.getImageData(0, 0, canvas.width, canvas.height),
            ],
        }));
        this.isDrawing = false;
    };

    /**
     * Handles the undo action by reverting the canvas to the previous state.
     * If there is no history, the function returns early.
     * The canvas is updated by removing the last item from the history array.
     * If there are remaining items in the history, the canvas is updated with the previous state.
     * If there are no remaining items in the history, the canvas is cleared with a white color.
     */
    handleUndo = () => {
        if (this.state.isReadOnly || this.state.history.length === 0) return;
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                const newHistory = [...this.state.history];
                newHistory.pop();
                this.setState({ history: newHistory });
                if (newHistory.length > 0) {
                    context.putImageData(newHistory[newHistory.length - 1], 0, 0);
                } else {
                    this.fillCanvasWhite(context);
                }
            }
        }
    };

    /**
     * Clears the drawing canvas by filling it with white color and resetting the drawing history.
     */
    handleClear = () => {
        if (this.state.isReadOnly) return;
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                this.fillCanvasWhite(context);
                this.setState({ history: [] });
            }
        }
    };

    /**
     * Retrieves the image data of the canvas.
     * @returns The image data of the canvas as a data URL, or null if the canvas is not available.
     */
    getCanvasImage = () => {
        const canvas = this.canvasRef.current;
        if (canvas) {
            return canvas.toDataURL();
        }
        return null;
    }

    render() {
        return (
            <div className="App">
                {this.state.isReadOnly && this.state.canvasImage ? (
                    <img src={this.state.canvasImage} alt="Drawing" className="drawing-image" />
                ) : (
                        <canvas
                            ref={this.canvasRef}
                            width={500}
                            height={500}
                            className="drawing-canvas"
                            data-testid="drawing-canvas"
                            onMouseDown={this.handleMouseDown}
                            onMouseMove={this.handleMouseMove}
                            onMouseUp={this.handleMouseUp}
                            onTouchStart={this.handleTouchStart}
                            onTouchMove={this.handleTouchMove}
                            onTouchEnd={this.handleTouchEnd}
                        ></canvas>
                )}
                {!this.state.isReadOnly && (
                    <div className="buttons">
                        <button onClick={this.handleUndo}>Undo</button>
                        <button onClick={this.handleClear}>Clear</button>
                    </div>
                )}
            </div>
        );
    }
}

export default DrawingCanvas;