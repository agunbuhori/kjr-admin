import React from 'react';
import { Box, MenuItem, Typography, Button, Divider } from '@material-ui/core';
import FeatherIcon from 'feather-icons-react';


const ProfileDropdown = () => (
  <Box>
    
    <Divider
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    />

    <Box>
      <MenuItem
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.main,
              boxShadow: 'none',
              minWidth: '50px',
              width: '45px',
              height: '40px',
              borderRadius: '10px',
            }}
          >
            <FeatherIcon icon="dollar-sign" width="18" height="18" />
          </Button>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '1.235',
              }}
            >
              My Profile
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Account Settings
            </Typography>
          </Box>
        </Box>
      </MenuItem>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />
      <MenuItem
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.success.light,
              color: (theme) => theme.palette.success.main,
              boxShadow: 'none',
              minWidth: '50px',
              width: '45px',
              height: '40px',
              borderRadius: '10px',
            }}
          >
            <FeatherIcon icon="shield" width="18" height="18" />
          </Button>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '1.235',
              }}
            >
              My Inbox
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Messages & Emails
            </Typography>
          </Box>
        </Box>
      </MenuItem>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />
      <MenuItem
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.error.light,
              color: (theme) => theme.palette.error.main,
              boxShadow: 'none',
              minWidth: '50px',
              width: '45px',
              height: '40px',
              borderRadius: '10px',
            }}
          >
            <FeatherIcon icon="credit-card" width="18" height="18" />
          </Button>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '1.235',
              }}
            >
              My Tasks
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              To-do and Daily Tasks
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    </Box>
  </Box>
);

export default ProfileDropdown;
