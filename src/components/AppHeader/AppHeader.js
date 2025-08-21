"use client";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import icon from "@/assets/icon.png";

const HeaderContainer = styled("header")(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 0),
    justifyContent: "center",
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    zIndex: 100,
}));

const StyledImage = styled(Image)(({ theme }) => ({
    verticalAlign: "middle",
    marginRight: 12,
    borderRadius: "8px",
    cursor: "pointer",
}));

export default function AppHeader() {
    return (
        <HeaderContainer>
            <Link href="/">
                <StyledImage
                    src={icon}
                    alt="JLPT Kanji Tester Icon"
                    width={40}
                    height={40}
                    priority
                />
            </Link>
        </HeaderContainer>
    );
}
