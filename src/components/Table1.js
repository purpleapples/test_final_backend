import { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
const Table1 = (
    {result,
    element_cnt}
) => {
    const {empty, column, product} = result;

    const sizePerPageList = [
        {text: 'All', value:element_cnt}
    ];
    const options = {
        sizePerPageList
    };
    return <div>        
        {empty ? (<>
        <p> 해당하신 일자에는 데이터가 없습니다.</p>        
        </>) : result && (
            <BootstrapTable keyField='key_value' 
                            data={product}
                            columns={ column }
                            striped
                            hover
                            pagination={ paginationFactory(options) } /> 
        )}
        
        
    </div>
}

export default Table1