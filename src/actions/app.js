import data from '../currentLoans.json';
import { loadData } from '../reducers/homeReducer';

export const fetchData = () => {

	return dispatch => {
		try {
			dispatch(loadData(data.loans));
		} catch (error) {
			console.log(error);
		}
	}
	
};