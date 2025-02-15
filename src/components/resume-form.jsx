import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export function ResumeForm({ form }) {
  const { control } = form;

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control,
    name: "achievements",
  });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  return (
    <Form {...form}>
      <form>
        <Card className="max-w-3xl mx-auto border-dashed">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Software Engineer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="profileSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A brief summary of your professional background and goals."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="123-456-7890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contact.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, State" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinkFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`socialLinks.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Linkedin" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`socialLinks.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://www.linkedin.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeSocialLink(index)}
                >
                  Remove Social Link
                </Button>
                <Separator />
              </div>
            ))}
            {socialLinkFields.length < 4 && (
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => appendSocialLink({ title: "", url: "" })}
              >
                <PlusCircle /> Add Social Link
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {experienceFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`experience.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Acme Inc" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.jobRole`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Role</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Software Engineer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Remote or custom location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="To enter bullet points, insert / at the end of the line."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeExperience(index)}
                >
                  Remove Experience
                </Button>
                <Separator />
              </div>
            ))}
            {experienceFields.length < 4 && (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() =>
                  appendExperience({
                    companyName: "",
                    jobRole: "",
                    startDate: "",
                    endDate: "",
                    location: "",
                    description: [],
                  })
                }
              >
                <PlusCircle /> Experience
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {educationFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`education.${index}.universityName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="University of California"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education.${index}.degreeTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education.${index}.startYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          step="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education.${index}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1900"
                          max="2099"
                          step="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education.${index}.cgpa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGPA (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="3.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`education.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="San Francisco, CA" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </Button>
                <Separator />
              </div>
            ))}
            {educationFields.length < 2 && (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() =>
                  appendEducation({
                    universityName: "",
                    degreeTitle: "",
                    startYear: "",
                    endYear: "",
                    cgpa: "",
                    location: "",
                  })
                }
              >
                <PlusCircle /> Add Education
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`projects.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="E-commerce Website" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Acme Inc" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.jobRole`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Role (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Software Engineer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="To enter bullet points, insert / at the end of the line."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeProject(index)}
                >
                  Remove Project
                </Button>
                <Separator />
              </div>
            ))}
            {projectFields.length < 3 && (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() =>
                  appendProject({
                    title: "",
                    companyName: "",
                    jobRole: "",
                    startDate: "",
                    endDate: "",
                    description: [],
                  })
                }
              >
                <PlusCircle /> Add Project
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Tech Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="techSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. JavaScript, React, Node.js"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your skills separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievementFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`achievements.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievement Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Employee of the Month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`achievements.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Recognized for outstanding performance and leadership in developing innovative solutions."
                          maxLength={160}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeAchievement(index)}
                >
                  <Trash2 /> Remove Achievement
                </Button>
                <Separator />
              </div>
            ))}
            {achievementFields.length < 4 && (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() =>
                  appendAchievement({
                    title: "",
                    description: "",
                  })
                }
              >
                <PlusCircle /> Add Achievement
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Courses and Certificates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={control}
                  name={`courses.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Advanced Web Development"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`courses.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Comprehensive course covering modern web development techniques and best practices."
                          maxLength={80}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`courses.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com/certificate"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="button"
                  variant="destructive"
                  onClick={() => removeCourse(index)}
                >
                  <Trash2 /> Remove Course
                </Button>
                <Separator />
              </div>
            ))}
            {courseFields.length < 3 && (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() =>
                  appendCourse({
                    title: "",
                    description: "",
                    link: "",
                  })
                }
              >
                <PlusCircle /> Add Course
              </Button>
            )}
          </CardContent>

          <CardHeader>
            <CardTitle>Passion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="passion.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passion Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Open Source Contribution" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="passion.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Passionate about contributing to open source projects and fostering community collaboration."
                      maxLength={60}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
