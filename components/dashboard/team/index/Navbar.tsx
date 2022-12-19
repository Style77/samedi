import { appwrite } from "../../../../store/appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Models, Query } from "appwrite";
import { useRouter } from "next/router";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const settings = ["Dashboard", "Logout"];

const Navbar = () => {
  const router = useRouter();
  const { id } = router.query;

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  const [user, setUser] = useState<Models.Account<Models.Preferences> | null>(
    null
  );
  const [roles, setRoles] = useState<string[]>([]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await appwrite.teams.get(id as string);
      setTeamName(team.name);
    };
    const fetchAvatar = async () => {
      const user = await appwrite.account.get();
      const avatarUrl = appwrite.avatars.getInitials(
        user?.name || "Unnamed",
        48,
        48
      );
      setAvatarUrl(avatarUrl.href);
    };
    const fetchUser = async () => {
      const user = await appwrite.account.get();
      setUser(user);
    };
    const fetchRoles = async () => {
      const user = await appwrite.account.get();
      const membership = await appwrite.teams.listMemberships(id as string, [
        Query.equal("userId", user.$id),
      ]);
      setRoles(membership.memberships[0].roles);
    };

    fetchUser();
    fetchTeam();
    fetchAvatar();
    fetchRoles();
  }, [id]);

  const handleMenuItem = (setting: string) => {
    switch (setting) {
      case "Logout":
        appwrite.account.deleteSession("current");
        router.push("/signin");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      default:
        handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={`/dashboard/teams/${id as string}`}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {teamName}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              <Stack direction="column">
                <>
                  <Typography variant="body1" noWrap>
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {roles[0]?.charAt(0).toUpperCase() + roles[0]?.slice(1)}
                  </Typography>
                </>
              </Stack>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.name}
                    src={appwrite.avatars.getInitials(user?.name).href}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItem(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
