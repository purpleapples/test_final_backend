

const getDateCondition = (dateStr, period) => {
    const date = new Date(dateStr);
    let dateCond = {};
    let week = date.getWeek().toString();
    if ( week.length ===1){
        week = '0' + week;    
    }        
    let month = (date.getMonth() +1).toString();
    if ( month.length ===1){
        month = '0' + month;    
    }        
    switch (period ){
        case 'week':
            dateCond['year']       = date.getFullYear().toString();
            dateCond['month']      = month;
            dateCond['weekofyear'] = week;
            break;
        case 'month':
            dateCond['year']  = date.getFullYear().toString();
            dateCond['month'] = month;
            break;
        case 'year':
            dateCond['year']  = date.getFullYear().toString();
            break;
    }
    return dateCond;
}

export default getDateCondition;