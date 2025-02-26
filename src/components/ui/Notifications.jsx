import { useState } from "react"
import { Box, Typography, IconButton, styled, Paper, Tooltip } from "@mui/material"
import {  DoneAllRounded  } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import NotificationsList from "./NotificationsList"
import { markAllAsReaded } from "../../store"
import { tooltipClasses } from '@mui/material/Tooltip';

const StyledPaper = styled(Paper)({
  backgroundColor: "#ffffff",
  color: "#1a1d21",
  minHeight: "100vh",
  borderRadius: 0,
  boxShadow: "none",
})

const TabPanel = styled(Box)({
  padding: "16px 0",
})

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));


// Add this custom styled component for the tab container
const CustomTabContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  marginBottom: "24px",
})

// Update the TabItem styled component to use a proper boolean prop
const TabItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: isActive ? "#f5f5f5" : "transparent",
  "&:hover": {
    backgroundColor: isActive ? "#f5f5f5" : "#fafafa",
  },
}))

const CountBadge = styled(Box)(({ color = "primary" }) => {
  const colors = {
    primary: { bg: "#1976d2", text: "#fff" },
    teal: { bg: "#e3f2fd", text: "#0288d1" },
    green: { bg: "#e8f5e9", text: "#2e7d32" },
  }

  return {
    backgroundColor: colors[color].bg,
    color: colors[color].text,
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
    minWidth: "28px",
    textAlign: "center",
  }
})

export default function NotificationsPanel() {
  const dispatch = useDispatch();
  const { notifications, notificationsLoading } = useSelector(state => state.notifications);
  const [activeTab, setActiveTab] = useState("all")
  const noReadedNotifications = notifications?.filter(item => !(item?.readed))

  // Update the renderTabs function to use isActive
  const renderTabs = () => (
    <CustomTabContainer>
      <TabItem  justifyContent={"center"} flexGrow={1} isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
        <Typography
          sx={{
            fontWeight: activeTab === "all" ? 600 : 400,
            color: activeTab === "all" ? "#000" : "#666",
          }}
        >
          Todas
        </Typography>
        {/* <CountBadge color="primary">22</CountBadge> */}
      </TabItem>
      <TabItem justifyContent={"center"} flexGrow={1} isActive={activeTab === "unread"} onClick={() => setActiveTab("unread")}>
        <Typography
          sx={{            
            fontWeight: activeTab === "unread" ? 600 : 400,
            color: activeTab === "unread" ? "#000" : "#666",
          }}
        >
          No leidas
        </Typography>
        {noReadedNotifications.length > 0 && <CountBadge color="teal">{noReadedNotifications.length}</CountBadge>}
      </TabItem>     
    </CustomTabContainer>
  )

  return (
    <StyledPaper sx={{ width: "450px" }} role="presentation">
      <Box sx={{ px: 2, position: "relative" }}>    
        <Box
          sx={{ 
            position: 'sticky', 
            top: 0, 
            backgroundColor: '#ffffff', 
            zIndex: 1, 
            pt: 2,
            pb: 2
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
              Notificaciones
            </Typography>            
            <Box sx={{ display: "flex", gap: 1 }}>
              <BootstrapTooltip title="Marcar todas como leidas">
                <IconButton sx={{ color: "#4caf50" }} onClick={() => dispatch(markAllAsReaded())}>
                  <DoneAllRounded />
                </IconButton>
              </BootstrapTooltip>              
            </Box>
          </Box>
          {renderTabs()}        
        </Box>    

        <Box sx={{ display: activeTab === "all" ? "block" : "none" }}>
          <NotificationsList 
            notifications={notifications}
            isLoading={notificationsLoading}
          />
        </Box>

        <Box sx={{ display: activeTab === "unread" ? "block" : "none" }}>
          <NotificationsList 
           emptyMessage={"No tienes notificaciones para leer"} 
           notifications={notifications?.filter(notify => !notify?.readed)} 
           isLoading={notificationsLoading}
          /> 
        </Box>
           
      </Box>
    </StyledPaper>
  )
}

