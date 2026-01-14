import React from "react";
import {
  AutoAwesomeMotionIcon,
  LoginIcon,
  LogoutIcon,
  BusinessIcon,
  AccountCircleIcon,
  DashboardCustomizeIcon,
  QueueIcon,
  ChatIcon,
  CodeIcon,
} from "./assets/icons";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { type Navigation } from "@toolpad/core/AppProvider";
import { Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { authPageAtom } from "./stores/authPage";
import EntityAvatar from "./assets/avatar";
import useAuth from "./hooks/useAuth";
import {
  createdModelCardAtom,
  createdModelCardContentAtom,
} from "./stores/modelCards";

const App: React.FC = () => {
  const currentUser = useAuth();
  const authPage = useAtomValue(authPageAtom);
  const createdModelCardId = useAtomValue(createdModelCardAtom);
  const createdModelCardContent = useAtomValue(createdModelCardContentAtom);

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: "public-model-cards",
      title: "Public Model Cards",
      icon: <AutoAwesomeMotionIcon />,
    },
    {
      segment: "entities",
      title: "Entities List",
      icon: <BusinessIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Personal",
    },
    ...(!currentUser
      ? [
          {
            segment: "auth",
            title: authPage === "register" ? "Sign Up" : "Log In",
            icon: <LoginIcon />,
          },
        ]
      : []),
    ...(currentUser
      ? [
          {
            segment: "personal",
            title: currentUser.name,
            icon: <EntityAvatar entity={currentUser} />,
            children: [
              {
                segment: "details",
                title: "Your Information",
                icon: <AccountCircleIcon />,
              },
              {
                segment: "model-cards",
                title: "Your Model Cards",
                icon: <AutoAwesomeMotionIcon />,
              },
            ],
          },
          {
            segment: "model-card-creator",
            title: "Add Model Card",
            icon: <QueueIcon />,
            children: [
              {
                segment: "base",
                title: "Step 1. Create Base Data",
                icon: <DashboardCustomizeIcon />,
              },
              ...(createdModelCardId
                ? [
                    {
                      segment: "content",
                      title: "Step 2. Populate Content",
                      icon: <ChatIcon />,
                    },
                  ]
                : []),
              ...(createdModelCardContent
                ? [
                    {
                      segment: "odrl",
                      title: "Step 3. Convert to ODRL",
                      icon: <CodeIcon />,
                    },
                  ]
                : []),
            ],
          },
          {
            kind: "divider" as const,
          },
          {
            segment: "logout",
            title: "Log Out",
            icon: <LogoutIcon />,
          },
        ]
      : []),
  ];

  const BRANDING = {
    title: "MODEL-CARD-TO-ODRL CONVERSION TOOL",
  };

  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
};

export default App;
