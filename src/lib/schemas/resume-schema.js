import * as z from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
});

const socialLinkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const experienceSchema = z.object({
  companyName: z.string(),
  jobRole: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  description: z
    .string()
    .transform((val) => val.split("/").map((desc) => desc.trim())),
});

const educationSchema = z.object({
  universityName: z.string(),
  degreeTitle: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  cgpa: z.string().optional(),
  location: z.string(),
});

const projectSchema = z.object({
  title: z.string(),
  companyName: z.string().optional(),
  jobRole: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z
    .string()
    .transform((val) => val.split("/").map((desc) => desc.trim())),
});

const achievementSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
});

const courseSchema = z.object({
  title: z.string(),
  description: z.string().max(80),
  link: z.string().url(),
});

const passionSchema = z.object({
  title: z.string(),
  description: z.string().max(60),
});

const resumeSchema = z.object({
  name: z.string(),
  jobRole: z.string(),
  profileSummary: z.string(),
  contact: contactSchema,
  socialLinks: z.array(socialLinkSchema).max(4),
  experience: z.array(experienceSchema).max(4),
  education: z.array(educationSchema).max(2),
  projects: z.array(projectSchema).max(3),
  techSkills: z
    .string()
    .transform((val) => val.split(",").map((skill) => skill.trim())),
  achievements: z.array(achievementSchema).max(4),
  courses: z.array(courseSchema).max(3),
  passion: passionSchema.optional(),
});

export default resumeSchema;
