import * as z from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

const socialLinkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const experienceSchema = z.object({
  companyName: z.string().optional(),
  jobRole: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  universityName: z.string().optional(),
  degreeTitle: z.string().optional(),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
  cgpa: z.string().optional(),
  location: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string().optional(),
  companyName: z.string().optional(),
  jobRole: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const achievementSchema = z.object({
  title: z.string().optional(),
  description: z.string().max(160).optional(),
});

const courseSchema = z.object({
  title: z.string().optional(),
  description: z.string().max(80).optional(),
  link: z.string().url().optional(),
});

const passionSchema = z.object({
  title: z.string().optional(),
  description: z.string().max(60).optional(),
});

const resumeSchema = z.object({
  name: z.string(),
  jobRole: z.string(),
  contact: contactSchema,
  profileSummary: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(4).optional(),
  experience: z.array(experienceSchema).max(4).optional(),
  education: z.array(educationSchema).max(2).optional(),
  projects: z.array(projectSchema).max(3).optional(),
  techSkills: z.string().optional(),
  achievements: z.array(achievementSchema).max(4).optional(),
  courses: z.array(courseSchema).max(3).optional(),
  passion: passionSchema.optional(),
});

export default resumeSchema;
