import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { User, Collaborator } from "../types/user";
import InputMask from 'react-input-mask';

type DialogProps = {
  onAdd: (user: Partial<User>) => void;
  onClose: () => void;
  onUpdate: (user: User) => void;
  open: boolean;
  processing: boolean;
  user?: User;
  collaborator?: Collaborator;
};

const CollaboratorDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  user,
  collaborator,
}: DialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(user && user.id);

  const handleSubmit = (values: Partial<Collaborator>) => {
    if (user && user.id) {
      onUpdate({ ...values, id: user.id } as User);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: collaborator?.name || '',
      email: collaborator?.email || '',
      mobile: collaborator?.mobile || '',
      cpf: collaborator?.cpf || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t("common.validations.required")),
      cpf: Yup.string(),
      mobile: Yup.string().required(t("common.validations.required")),
      email: Yup.string()
        .email(t("common.validations.email"))
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {editMode
            ? t("admin.collaborators.modal.edit.title")
            : t("admin.collaborators.modal.add.title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t("admin.collaborators.form.name.label")}
            name="name"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <InputMask
            id="cpf" 
            name="cpf" 
            mask="999-999-999-99"
            value={formik.values.cpf} 
            onChange={formik.handleChange}
            disabled={processing}
          >
            {
              () => (
                <TextField
                  margin="normal"
                  fullWidth
                  label={t("admin.collaborators.form.cpf.label")}
                  error={formik.touched.cpf && !!formik.errors.cpf}
                  helperText={formik.touched.cpf && formik.errors.cpf}
                />
              )
            }
          </InputMask>
          <InputMask
            id="mobile" 
            name="mobile" 
            mask="(99) 99999-9999" 
            value={formik.values.mobile} 
            onChange={formik.handleChange}
            disabled={processing}
          >
            {
              () => (
                <TextField 
                  margin="normal"
                  fullWidth 
                  name="mobile"
                  label={t("admin.collaborators.form.mobile.label")}
                  error={formik.touched.mobile && !!formik.errors.mobile}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              )
            }
            </InputMask>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("admin.collaborators.form.email.label")}
            name="email"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("admin.collaborators.modal.edit.action")
              : t("admin.collaborators.modal.add.action")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CollaboratorDialog;
