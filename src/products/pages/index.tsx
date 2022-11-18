import { Fab } from "@material-ui/core";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "../components/table"
import ProductDialog from "../components/dialog";
import { ProductService } from "../services";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { IProduct } from "../types/product";
import Loader from "../../core/components/Loader";


function Products() {
    const [processing, setProcessing] = useState(false);
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [productUpdated, setProductUpdated] = useState<any | undefined>(undefined);
    const [products, setProducts] = useState<IProduct[]>([]);
    const { t } = useTranslation();
    const snackbar = useSnackbar();

    async function loadProducts() {
        try {
            setProcessing(true);
            const responseProducts = await ProductService.getProducts();

            setProducts(responseProducts); 
            setProcessing(false);
        } catch (error) {
            setProducts([])
            snackbar.error(t('admin.common.snackbar.error'));
        }
    }

    const handleOpenProductDialog = () => {
        setOpenProductDialog(true);
    }

    const handleCloseProductDialog = () => {
        setOpenProductDialog(false);
    }

    const handleOpenUserDialog = (teste: any) => {
        setProductUpdated(teste);
        setOpenProductDialog(true);
    };

    const handleUpdateProduct = async (values: any, productId: number) => {
        try {
            await ProductService.updateProduct(productId, values);

            setOpenProductDialog(false);
            snackbar.success(t('admin.products.snackbar.update.success'));
            loadProducts();
        } catch (err) {
            snackbar.error(t('admin.products.snackbar.update.error'));
        }
    } 

    const handleAddProduct = async (product: any) => {
        try {
            const newProduct = await ProductService.addProduct(product);
            const currrentProducts = [...products];
            
            currrentProducts.unshift(newProduct);
            
            setProducts(currrentProducts);
            setOpenProductDialog(false);
            snackbar.success(t('admin.products.snackbar.add.success'));
        } catch (error) {
            snackbar.error(t('admin.common.snackbar.error'));
        }
    }


    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <AdminAppBar>
                <AdminToolbar title={t("admin.products.toolbar.title")}>
                    <Fab
                        aria-label="logout"
                        color="primary"
                        disabled={processing}
                        onClick={handleOpenProductDialog}
                        size="small"
                    >
                        <AddIcon />
                    </Fab>        
                </AdminToolbar>       
            </AdminAppBar>
            {
                !processing  ? (
                    <Table
                        processing={processing}
                        onEdit={handleOpenUserDialog}
                        products={products}
                    />    
                ) : (
                    <Loader />
                )        
            }    
            
            {openProductDialog && (
                <ProductDialog
                    onAdd={handleAddProduct}
                    onClose={handleCloseProductDialog}
                    onUpdate={handleUpdateProduct}
                    open={openProductDialog}
                    processing={processing}
                    product={productUpdated}
                />
            )}
      </>
    )
}


export default Products;