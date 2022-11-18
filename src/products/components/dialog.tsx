import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools'

interface DialogProps {
  onAdd: (product: Partial<any>) => void;
  onClose: () => void;
  onUpdate: (product: any, id: number) => void;
  open: boolean;
  processing: boolean;
  product?: any;
};



const ProductDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  product,
}: DialogProps) => {
  const { t } = useTranslation();
  const isOnEditMode = !!product?.id;

  const formSchema = Yup.object({
    name: Yup.string()
      .required(t("common.validations.required")),
    quantity: Yup.number().required(t("common.validations.required")),
    price: Yup.string().required(t("common.validations.required")),
    minimunStock: Yup.number().required(t("common.validations.required")),
  })

  const handleSubmit = (values: Partial<any>) => {
    const priceString = values?.price?.replace('R$', '');
    const data = { ...values }

    if (priceString) {
      data.price = parseFloat(priceString)
    }

    if (product?.id) {
      onUpdate(data, product.id);
    } else {
      onAdd(data);
    }
  };

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors, touchedFields  },
    register,
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form noValidate onSubmit={onSubmit(handleSubmit)}>
        <DialogTitle id="user-dialog-title">
          {isOnEditMode
            ? t("admin.products.modal.edit.title")
            : t("admin.products.modal.add.title")}
        </DialogTitle>
        <DialogContent>
        <TextField
            type="text"
            margin="normal"
            fullWidth
            label={t("admin.products.form.name.label")}
            autoComplete="family-name"
            autoFocus
            {...register('name')}
            disabled={processing}
            error={touchedFields.name  && !!errors.name}
            helperText={touchedFields.name && errors.name}
            defaultValue={product?.name}
          />
           <TextField
            margin="normal"
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
            disabled={processing}
            label={t("admin.products.form.quantity.label")}
            {...register('quantity')}
            error={touchedFields.quantity && !!errors.quantity}
            helperText={touchedFields.quantity && errors.quantity}
            defaultValue={product?.quantity}
          /> 
           <TextField 
             type="text"
             margin="normal"
             fullWidth 
             disabled={processing}
             label={t("admin.products.form.price.label")}
             {...register('price')}
             error={touchedFields.price && !!errors.price}
             helperText={touchedFields.price && errors.price}
            defaultValue={product?.price}
           />    
           <TextField
            type="text"
            margin="normal"
            fullWidth
            {...register('minimunStock')}
            inputProps={{ min: 1 }}
            disabled={processing}
            label={t("admin.products.form.minimunStock.label")}
            error={touchedFields.minimunStock && !!errors.minimunStock}
            helperText={touchedFields.minimunStock && errors.minimunStock}
            defaultValue={product?.minimunStock}
          />   
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {isOnEditMode
              ? t("admin.products.modal.edit.action")
              : t("admin.products.modal.add.action")}
          </LoadingButton>
        </DialogActions>
        </form>
        <DevTool control={control} />
    </Dialog>
  );
};

export default ProductDialog;
