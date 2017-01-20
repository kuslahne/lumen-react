import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//libraries
import _ from 'lodash';

/**
 * Import all constants as an object.
 */
import * as ActionType from '../../constants/actionType';
import Message from '../../constants/message';
import Common from '../../constants/common';

/**
 * Import all apiAction and crudAction as an object.
 */
import * as apiAction from '../../actions/apiAction';
import * as crudAction from '../../actions/crudAction';

// Import custom components
import DataTable from '../common/table/table.component';
import ProductConfirmBox from './product-confirm-box.component';

class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
    };

    componentWillMount() {
        this.fetchData();
    }

    componentWillUnmount() {

    }

    fetchData() {
        this.props.actions.fetchAll(Common.PRODUCT);
    }

    render() {

        let data = this.props.products;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-info">
                        <div className="box-header">
                            <h3 className="box-title">Product List:</h3>
                            <div className="pull-right box-tools">
                                <a href="#" className="btn btn-primary" role="button" data-toggle="modal"
                                   data-target="#product-add-modal" title="Add Product"><i
                                    className="glyphicon glyphicon-plus"></i>&nbsp;Add Product</a>
                            </div>
                        </div>
                        <div className="box-body">
                            {data.length > 0 && <DataTable columns={columns} data={data}/>}
                        </div>
                    </div>
                </div>

                <ProductConfirmBox />

            </div>

        );
    }
}

/**
 * Map the state to props.
 */
function mapStateToProps(state) {
    return {
        products: state.crud.products,
        pagination: state.crud.pagination,
        apiState: state.api
    }
}

/**
 * Map the actions to props.
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, crudAction, apiAction), dispatch)
    }
}

const columns = [
    {displayName: 'ID', attribute: 'id'},
    {displayName: 'Code', attribute: 'code'},
    {displayName: 'Name', attribute: 'name'},
    {displayName: 'Description', attribute: 'description'},
    {displayName: 'Status', attribute: 'status'},
    {displayName: 'Actions', attribute: ''}
];

/**
 * Connect the component to the Redux store.
 */

export default  connect(mapStateToProps, mapDispatchToProps)(ProductList)