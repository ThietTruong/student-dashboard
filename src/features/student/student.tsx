import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { cityActions } from '../city/city.slice';

export interface StudentProps {}

export function Student(props: StudentProps) {
  const dispath = useDispatch();
  React.useEffect(() => {
    dispath(cityActions.fetchCityList());
  }, [dispath]);
  return <Outlet />;
}
