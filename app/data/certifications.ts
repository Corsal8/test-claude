import type { Certification } from "~/types/certification.types";

export const certifications: Certification[] = [
  {
    id: "AWS-SAA",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    initials: "AWS",
    verifyUrl: "https://www.credly.com",
  },
  {
    id: "CKA",
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    year: "2023",
    initials: "K8s",
    verifyUrl: "https://www.credly.com",
  },
  {
    id: "GCP-PCD",
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    year: "2022",
    initials: "GCP",
    verifyUrl: "https://www.credential.net",
  },
];
