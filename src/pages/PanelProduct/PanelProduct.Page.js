import {Component} from 'react'
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {fetchProducts} from 'redux/actions/product.action';
import {AdminLayout} from "../../layout";

class PanelProductPage extends Component {
    componentDidMount() {
        try {
            this.props.getProducts();
        } catch (e) {
            console.log('error products');
        }
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Article | About Us</title>
                </Helmet>

                <AdminLayout>
                    <h1>صفحه پنل محصولات</h1>
                </AdminLayout>
            </>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts())
    }
};

const PanelProduct = connect(undefined, mapDispatchToProps)(PanelProductPage)

export {PanelProduct};
