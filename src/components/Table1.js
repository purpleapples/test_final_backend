import { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
const Table1 = (
    {result}
) => {
    const {column, product} = result;

    return <div>
        table 1
        {result && (
            <BootstrapTable keyField='key_value' 
                            data={product}
                            columns={ column }
                            striped
                            hover
                            pagination={ paginationFactory() } /> 
        )}
        
        
    </div>
}

export default Table1