import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';


function UiCalendar(){
	const calendar = new Calendar('#calendar',{ 
		defaultView: 'week',
		usageStatistics: false 

    });
	return(
		<div id='calendar' style={{ height:'800px' }}></div>
	)
}

export default UiCalendar ;
