import React from 'react';
import { render, screen } from '@testing-library/react';
import DrawingCanvas from './DrawingCanvas';
import { expect, test } from 'vitest';

test('fillCanvasWhite fills the canvas with white color', () => {
    render(<DrawingCanvas />);

    // Get the canvas element
    const canvasElement = screen.getByTestId('drawing-canvas') as HTMLCanvasElement;
    const context = canvasElement.getContext('2d');

    // Call the fillCanvasWhite method
    if (context) {
        DrawingCanvas.prototype.fillCanvasWhite.call({ canvasRef: { current: canvasElement } }, context);
    }

    // Check if the canvas is filled with white color
    const imageData = context?.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const data = imageData?.data;
    const isFilledWithWhite = data?.every((value, _) => value === 255 ?? false);
    expect(isFilledWithWhite).toBe(true);
});