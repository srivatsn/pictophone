import React, { Component, createRef, MouseEvent } from 'react';
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
            this.setState({ isReadOnly: !this.props.editable }, () => {
                if (this.state.isReadOnly && this.canvasRef.current) {
                    const canvas = this.canvasRef.current;
                    this.setState({ canvasImage: canvas.toDataURL() });
                } else if (!this.state.isReadOnly && this.canvasRef.current) {
                    const canvas = this.canvasRef.current;
                    const context = canvas.getContext('2d');
                    if (context) {
                        this.fillCanvasWhite(context);
                        this.setState({ history: [] });
                    }
                }
            });
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

    handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        if (this.state.isReadOnly) return;
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                context.beginPath();
                this.isDrawing = true;
            }
        }
    };

    handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!this.isDrawing || this.state.isReadOnly) return;
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                context.stroke();
            }
        }
    };
    /**
     * Handles the mouse up event.
     * If the canvas is currently being drawn on, it saves the current state of the canvas to the history.
     * @returns void
     */
    handleMouseUp = () => {
        if (!this.isDrawing || this.state.isReadOnly) return;
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                this.setState((prevState) => ({
                    history: [
                        ...prevState.history,
                        context.getImageData(0, 0, canvas.width, canvas.height),
                    ],
                }));
                this.isDrawing = false;
            }
        }
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

    render() {
        return (
            <div className="App">
                {this.state.canvasImage ? (
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
