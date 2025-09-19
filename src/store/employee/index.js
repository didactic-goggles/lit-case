import {createSlice} from '@reduxjs/toolkit';
import mockEmployees from './mock-data';

const getSavedEmployees = () => {
  const employees = localStorage.getItem('employees');
  return employees ? JSON.parse(employees) : mockEmployees;
};

const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

const initialState = {
  employees: getSavedEmployees(),
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      saveEmployees(state.employees);
    },
    updateEmployee: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
      saveEmployees(state.employees);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      saveEmployees(state.employees);
    },
  },
});

export const {setEmployees, addEmployee, updateEmployee, deleteEmployee} =
  employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
