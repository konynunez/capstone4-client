"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1rem 0.5rem; /* Reduced padding for a smaller footer */
  text-align: center;
  position: relative;
  bottom: 0;
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border for softness */
  border-radius: 0; /* Removed rounded corners */
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterSection = styled.div`
  margin: 1rem 0;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterLink = styled.span`
  margin-right: 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #4caf50;
  }
`;

const FooterText = styled.p`
  margin: 0.5rem;
`;

const FooterBrand = styled.h2`
  margin: 0.5rem;
  transition: color 0.3s ease;
  &:hover {
    color: #ff69b4; /* Pink color when hovered */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #4caf50;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterBrand>© 2024 Panoramix</FooterBrand>
          <FooterText>All Rights Reserved</FooterText>
        </FooterSection>
        <FooterSection>
          <FooterLinks>
            <Link href="/" passHref>
              <FooterLink>Home</FooterLink>
            </Link>
            <Link href="/note" passHref>
              <FooterLink>iNote</FooterLink>
            </Link>
            <Link href="/contact" passHref>
              <FooterLink>Contact Me</FooterLink>
            </Link>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <SocialIcons>
            <SocialIcon
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
