import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProfilePage } from '../ProfilePage';
import { useNavigation } from '@react-navigation/native';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('ProfilePage', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ProfilePage />);
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  it('navigates to changePassword screen', () => {
    // Mock navigate function
    useNavigation.mockReturnValue({ navigate: jest.fn() });

    const { getByText } = render(<ProfilePage />);
    const button = getByText('Change Password');
    fireEvent.press(button);
    expect(useNavigation().navigate).toHaveBeenCalledWith('changePassword');
  });

  it('navigates to feedback screen', () => {
    // Mock navigate function
    useNavigation.mockReturnValue({ navigate: jest.fn() });

    const { getByText } = render(<ProfilePage />);
    const button = getByText('Feedback');
    fireEvent.press(button);
    expect(useNavigation().navigate).toHaveBeenCalledWith('feedback');
  });



  it('opens avatar selection modal when avatar button is pressed', () => {
    const { getByTestId } = render(<ProfilePage />);
    fireEvent.press(getByTestId('avatarButton'));
    expect(getByTestId('modal')).toBeTruthy();
  });

  it('changes avatar when an avatar option is selected', () => {
    const { getByTestId } = render(<ProfilePage />);
    fireEvent.press(getByTestId('avatarButton'));
    fireEvent.press(getByTestId('avatarOption1')); // Assuming 'avatarOption1' is the testID of the second avatar option
    expect(getByTestId('avatar')).toBeTruthy(); // Assuming 'avatar' is the testID of the avatar
  });
  
});
