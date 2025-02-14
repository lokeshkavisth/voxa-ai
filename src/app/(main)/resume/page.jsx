"use client";

import { getResumeData, saveResume } from "@/actions/resume-actions";
import { ResumeForm } from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import resumeSchema from "@/lib/schemas/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudDownload, CloudUpload, Laptop } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("form");
  const [data, setData] = useState(null);

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      jobRole: "",
      profileSummary: "",
      contact: {},
      socialLinks: [],
      experience: [],
      education: [],
      projects: [],
      techSkills: [],
      achievements: [],
      courses: [],
      passion: {},
    },
  });

  const { handleSubmit, formState, reset } = form;
  const { isSubmitting, isValid, isSubmitted } = formState;

  const onSubmit = async (values) => {
    setData(values);
    localStorage.setItem("resume", JSON.stringify(values));

    toast({
      title: "Resume saved",
      description: "Your resume has been successfully saved to locally.",
    });
  };

  const saveResumeToServer = async (resumeData) => {
    if (!resumeData) {
      toast({
        title: "No resume data to save.",
        description: "Please fill in the form before saving.",
        variant: "destructive",
      });
      return;
    }

    const res = await saveResume(resumeData);
    console.log(res);

    toast({
      title: "Resume saved",
      description: "Your resume has been successfully saved to the database.",
    });
  };

  const getResumeFromServer = async () => {
    const res = await getResumeData();
    if (!res.userId) {
      toast({
        title: "No resume data",
        description: "No previous resume data found in the database.",
        variant: "destructive",
      });
      return;
    }

    setData(res.content);
    console.log(res.content);
    reset(res.content); // update the form data

    toast({
      title: "Resume data fetched",
      description:
        "Your resume data has been successfully fetched from the database.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex justify-end space-x-4">
            <Button onClick={getResumeFromServer} disabled={isSubmitting}>
              Get from Cloud <CloudDownload />
            </Button>

            <Button
              onClick={() => saveResumeToServer(data)}
              disabled={isSubmitting || !isSubmitted || !isValid}
            >
              Upload to Cloud <CloudUpload />
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Locally"} <Laptop />
            </Button>
          </div>
        </div>

        <TabsContent value="form">
          <ResumeForm form={form} />
        </TabsContent>
        <TabsContent value="preview">
          <ResumePreview
            data={data}
            // data={form.getValues()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
