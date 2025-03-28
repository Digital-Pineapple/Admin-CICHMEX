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
import DetailSlide from "./DetailSlide";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";


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
    const [openDetail, setOpenDetail] = useState({ value: false, slide: '' })
    useEffect(() => {
        loadAllBanners()
    }, [user])

    const handleOpen = (data) => {
        setOpen({ value: true, image: data })
    }
    const handleClose = () => {
        setOpen({ value: false, image: '' })
    }

    const handleOpenDetail = (data) => {
        setOpenDetail({ value: true, slide: data })
    }
    const handleCloseDetail = () => {
        setOpenDetail({ value: false, slide: '' })
    }



    const rowsWithIds = (data) =>
        data?.map((item, _id) => ({
            id: _id.toString(),
            ...item,
        })) || [];

    function CustomToolbar() {

        return (
            <GridToolbarContainer sx={{ justifyContent: "center", paddingX: 5 }}>
                <GridToolbarQuickFilter variant="outlined" />
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
                style={{ objectFit: "contain", borderRadius: '10px' }}
            />
            <Search width={'15px'} />
        </Box>
    )

    const paths = [
        { path: `/contenidos/banners`, name: "Banners" },
    ];

    return (
        <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
            <Grid2
                size={12}
                paddingRight={15}
                flexGrow={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginBottom={2}
            >
                <Typography variant="h4">
                    <strong>Banners</strong>
                </Typography>
            </Grid2>
            <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
                <BreadcrumbCustom paths={paths} />
                <Fab

                    onClick={() => navigate('/contenidos/banners/agregar')}
                    color="secondary"
                    aria-label="Agregar categoría"
                    title="Agragar categoría"
                >
                    <Add />
                </Fab>
            </Grid2>
            <DataGrid
                sx={{
                    fontSize: "12px",
                    fontFamily: "sans-serif",
                    borderRadius: { xs: '5px', md: '20px' },
                    bgcolor: "#fff",
                    border: "1px solid rgb(209, 205, 205)",
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid rgb(230, 223, 223)",
                    },
                }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
                                callbackToEdit={() => navigate(`editar/${params.row._id}`)}
                            />,
                            <Tooltip title="Ver Detalles">
                                <IconButton
                                    aria-label="ver detalle"
                                    color="primary"
                                    onClick={() => handleOpenDetail(params.row)}
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
                    <img src={open.image} width={'100%'} height={'100%'} style={{ borderRadius: '10px' }} />
                </Box>
            </Modal>
            <Modal
                open={openDetail.value}
                onClose={handleCloseDetail}
                aria-labelledby="modal-detail-slide"
                aria-describedby="modal-detail-slide"
            >
                <Box sx={style}>
                    <DetailSlide slide={openDetail.slide} />
                </Box>
            </Modal>

        </Grid2>
    );
};


export default Banners
