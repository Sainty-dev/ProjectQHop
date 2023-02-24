import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppConstants} from '../constants/AppConstants';
import {IUserContactDetails, IUserDetails} from '../interface';

export const DataService = {
  async fetchUserDetails(): Promise<IUserDetails> {
    const userDetails = await AsyncStorage.getItem(AppConstants.USER_DETAILS);
    if (userDetails !== null) {
      return JSON.parse(userDetails);
    } else {
      const sampleUserDetails = {name: 'Michael', surname: 'Baker'};
      await AsyncStorage.setItem(
        AppConstants.USER_DETAILS,
        JSON.stringify(sampleUserDetails),
      );
      return sampleUserDetails;
    }
  },

  async fetchUserContactDetails(): Promise<IUserContactDetails> {
    const userContactDetails = await AsyncStorage.getItem(
      AppConstants.USER_CONTACT_DETAILS,
    );
    if (userContactDetails !== null) {
      return JSON.parse(userContactDetails);
    } else {
      const sampleUserContactDetails = {
        email: 'michael@test.com',
        cell_no: '0825558364',
      };
      await AsyncStorage.setItem(
        AppConstants.USER_CONTACT_DETAILS,
        JSON.stringify(sampleUserContactDetails),
      );
      return sampleUserContactDetails;
    }
  },

  async updateUserDetails(data: IUserDetails): Promise<void> {
    await AsyncStorage.setItem(AppConstants.USER_DETAILS, JSON.stringify(data));
  },

  async updateUserContactDetails(data: IUserContactDetails): Promise<void> {
    await AsyncStorage.setItem(
      AppConstants.USER_CONTACT_DETAILS,
      JSON.stringify(data),
    );
  },
};

export type Dataset = IUserDetails | IUserContactDetails;
