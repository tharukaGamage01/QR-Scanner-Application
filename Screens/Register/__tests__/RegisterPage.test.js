import React from 'react';
import { render} from '@testing-library/react-native';
import RegisterPage from '../RegisterPage'; // Replace with the correct import path

describe('RegisterPage', () => {
    it("renders RegisterPage correctly", () => {
        const { getByTestId } = render(<RegisterPage />);
        expect(getByTestId('registerPage')).toBeTruthy();
        expect(getByTestId('title')).toBeTruthy();
        expect(getByTestId('slogan')).toBeTruthy();
        expect(getByTestId('createAccountSection')).toBeTruthy();
        expect(getByTestId('fullNameLabel')).toBeTruthy();
        expect(getByTestId('fullNameInput')).toBeTruthy();
        // Add similar assertions for other elements
    });

});
