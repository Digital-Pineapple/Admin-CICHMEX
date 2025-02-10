import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
    DataGrid,
    GridPagination,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    gridPageCountSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MuiPagination from "@mui/material/Pagination";
import {
    Add,
    Close,
    Download,
    OpenInFullRounded,
    RefreshOutlined,
    Search,
    Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import {
    Button,
    Avatar,
    Grid2,
    Typography,
    Fab,
    Tooltip,
    IconButton,
    Modal,
    Card,
    CardHeader,
    CardMedia,
    Switch,
    CircularProgress,
    Box,
} from "@mui/material";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useAuthStore, useUI } from "../../hooks";
import Image from "mui-image";


function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
            }}
        />
    );
}
export function SortedDescendingIcon() {
    return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
    return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
    return <SortIcon className="icon" />;
}

function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "15px",
};

const Banners = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { loadAllBanners, banners, changeActiveBanner, loading, deleteOneBanner } = useUI()
    const [open, setOpen] = useState({ value: false, image: '' })
    useEffect(() => {
        loadAllBanners()
    }, [user])

    const handleOpen = (data) => {
        setOpen({ value: true, image: data })
    }
    const handleClose = () => {
        setOpen({ value: false, image: '' })
    }


    const rowsWithIds = (data) =>
        data?.map((item, _id) => ({
            id: _id.toString(),
            ...item,
        })) || [];

    const exportToExcel = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Categorias");

        // Agregar encabezados de columna
        const headerRow = worksheet.addRow([
            "ID",
            "Nombre de la categoria",
            "Imagen",
        ]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
        });

        // Agregar datos de las filas
        rowsWithIds.forEach((row) => {
            worksheet.addRow([row._id, row.name]);
        });

        // Crear un Blob con el archivo Excel y guardarlo
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, "categorias.xlsx");
        });
    };

    function CustomToolbar() {
        const apiRef = useGridApiContext();

        const handleGoToPage1 = () => apiRef.current.setPage(1);

        return (
            <GridToolbarContainer sx={{ justifyContent: "space-between", paddingX: 5 }}>
                <GridToolbarQuickFilter placeholder="Buscar" />
                <Button variant="text" onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
            </GridToolbarContainer>
        );
    }
    if (loading) {
        return <LoadingScreenBlue />;
    }

    const handleChangeActive = (data) => {
        const active = data.row.is_active
        const newValue = !active
        changeActiveBanner(data.row._id, newValue)
    }

    const renderChip = (values) => {
        const { is_active } = values.row;
        return <Switch checked={is_active} color="secondary" onClick={() => handleChangeActive(values)} />

    };
    const renderImage = (src) => (
        <Box
            component={"span"}
            alignContent={"center"}
            onClick={() => handleOpen(src)}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            padding={0.5}
            justifyContent={"center"}
        >
            <img
                src={src}
                alt={src}
                style={{ objectFit: "contain", borderRadius:'10px' }}
            />
            <Search width={'15px'}  />
        </Box>
    )

    return (
        <Grid2 container maxWidth={"85vw"} gap={2}>
            <Grid2
                marginTop={{ xs: "-30px" }}
                size={12}
                className="Titles"
                minHeight={"80px"}
            >
                <Typography
                    textAlign={"center"}
                    variant="h1"
                    fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
                >
                    Banners
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <Button
                    //   onClick={() => loadCategories()}
                    variant="contained"
                    color="primary"
                >
                    <RefreshOutlined />
                    Recargar
                </Button>
                <Fab
                    sx={{ right: "-80%" }}
                    onClick={() => navigate('/contenidos/banners/agregar')}
                    color="secondary"
                    aria-label="Agregar categoría"
                    title="Agragar categoría"
                >
                    <Add />
                </Fab>
            </Grid2>

            <DataGrid
                sx={{ fontSize: "20px", marginTop: 2, fontFamily: "BikoBold" }}
                columns={[
                    {
                        field: "is_active",
                        headerName: "Activo",
                        flex: 0.5,
                        align: "center",
                        renderCell: (params) => [renderChip(params)],
                    },
                    {
                        field: "title",
                        hideable: false,
                        headerName: "Titulo",
                        flex: 1,
                        sortable: false,
                    },
                    {
                        field: "no_slide",
                        hideable: false,
                        headerName: "Posicion",
                        flex: 1,
                        sortable: "true",
                    },
                    {
                        field: "image_slide",
                        headerName: "Imagen web",
                        flex: 1,
                        align: "center",
                        renderCell: (params) => [renderImage(params.row.image_slide)],
                    },
                    {
                        field: "image_slide_movil",
                        headerName: "Imagen  dispositivos moviles",
                        flex: 1,
                        align: "center",
                        renderCell: (params) => [renderImage(params.row.image_slide_movil)],
                    },
                    {
                        field: "Opciones",
                        headerName: "Opciones",
                        align: "center",
                        flex: 1,
                        sortable: false,
                        type: "actions",
                        getActions: (params) => [
                            <DeleteAlert
                                title={`¿Desea eliminar el slide No. ${params.row.no_slide}?`}
                                callbackToDeleteItem={() => deleteOneBanner(params.row._id)}
                            />,
                            <EditButton
                                title={`Desea editar el slide No. ${params.row.no_slide}?`}
                                callbackToEdit={()=>navigate(`editar/${params.row._id}`)}
                            />,
                            <Tooltip title="Ver Detalles">
                                <IconButton
                                    aria-label="ver detalle"
                                    color="primary"
                                //   onClick={() => handleOpen(params.row)}
                                >
                                    <Visibility />
                                </IconButton>
                            </Tooltip>,
                        ],
                    },
                ]}
                initialState={{
                    sorting: {
                        sortModel: [{ field: "no_slide", sort: "asc" }],
                    },
                    pagination: {
                        paginationModel: { pageSize: 10 },
                    },
                }}
                density="standard"
                rows={rowsWithIds(banners)}
                pagination
                slots={{
                    pagination: CustomPagination,
                    toolbar: CustomToolbar,
                    columnSortedDescendingIcon: SortedDescendingIcon,
                    columnSortedAscendingIcon: SortedAscendingIcon,
                    columnUnsortedIcon: UnsortedIcon,
                }}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                printOptions={{
                    hideFooter: true,
                    hideToolbar: true,
                }}
                style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            />
            <Modal
                open={open.value}
                onClose={handleClose}
                aria-labelledby="modal-detail-image"
                aria-describedby="modal-detail-image"
            >
                <Box sx={style}>
                    <img src={open.image} width={'100%'} height={'100%'} style={{borderRadius:'10px'}} />
                </Box>
            </Modal>

        </Grid2>
    );
};


export default Banners
