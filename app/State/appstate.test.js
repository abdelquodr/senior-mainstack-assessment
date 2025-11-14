import { useContext } from 'react';
import { appStateReducer, AppStateProvider, useAppState, AppStateContext } from './AppState';
import { render, screen, fireEvent } from '@testing-library/react';


describe('appStateReducer', () => {

    // The reducer should correctly handle the 'ADD_FILTERFORM_TYPE' action, adding the value to the filterFormDataType array in the state.
    it('should add value to filterFormDataType array when ADD_FILTERFORM_TYPE action is dispatched', () => {
      const state = { filterFormDataType: [] };
      const action = { type: 'ADD_FILTERFORM_TYPE', value: 'example' };
      const result = appStateReducer(state, action);
      expect(result.filterFormDataType).toEqual(['example']);
    });

    // The reducer should correctly handle the 'REMOVE_FILTERFORM_TYPE' action, removing the value from the filterFormDataType array in the state.
    it('should remove value from filterFormDataType array when REMOVE_FILTERFORM_TYPE action is dispatched', () => {
      const state = { filterFormDataType: ['example1', 'example2'] };
      const action = { type: 'REMOVE_FILTERFORM_TYPE', value: 'example1' };
      const result = appStateReducer(state, action);
      expect(result.filterFormDataType).toEqual(['example2']);
    });

    // The reducer should correctly handle the 'ADD_FILTERFORM_STATUS' action, adding the value to the filterFormDataStatus array in the state.
    it('should add value to filterFormDataStatus array when ADD_FILTERFORM_STATUS action is dispatched', () => {
      const state = { filterFormDataStatus: [] };
      const action = { type: 'ADD_FILTERFORM_STATUS', value: 'example' };
      const result = appStateReducer(state, action);
      expect(result.filterFormDataStatus).toEqual(['example']);
    });

    // The reducer should handle the case where the filterFormDataType array in the state is empty, and correctly remove a value when 'REMOVE_FILTERFORM_TYPE' action is dispatched.
    it('should handle empty filterFormDataType array and remove value when REMOVE_FILTERFORM_TYPE action is dispatched', () => {
      const state = { filterFormDataType: [] };
      const action = { type: 'REMOVE_FILTERFORM_TYPE', value: 'example' };
      const result = appStateReducer(state, action);
      expect(result.filterFormDataType).toEqual([]);
    });
});


describe('AppStateProvider', () => {

    // should create a provider to wrap the entire application
    it('should create a provider to wrap the entire application', () => {
  
      const children = <div>Test</div>;
      const { container } = render(
        <AppStateProvider>{children}</AppStateProvider>
      );
      expect(container.firstChild).toBeInTheDocument();
    });


    // should return the same state object if an unknown action type is dispatched
    it('should return the same state object if an unknown action type is dispatched', () => {
      const initialState = {
        filterFormDataType: [],
        filterFormDataStatus: [],
      };
      const TestComponent = () => {
        const { state } = useAppState();
        return <div>{JSON.stringify(state)}</div>;
      };

      const { container } = render(
        <AppStateProvider>
          <TestComponent />
        </AppStateProvider>
      );

      expect(container.firstChild).toHaveTextContent(
        JSON.stringify(initialState)
      );
    });
});


