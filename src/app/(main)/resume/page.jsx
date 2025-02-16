"use client";

import {
  analyzeResume,
  getResumeData,
  saveResume,
} from "@/actions/resume-actions";
import { ResumeForm } from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import ResumeFeedback from "@/components/resume/resume-feedback";
import { FullScreenSpinner, Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sampleResumeData } from "@/data/sample-resume";
import { toast } from "@/hooks/use-toast";
import resumeSchema from "@/lib/schemas/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Download,
  EllipsisVertical,
  Laptop,
  Sparkles,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("form");
  const [resume, setResume] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const templateRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
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
    setResume(values);
    localStorage.setItem("resume", JSON.stringify(values));

    toast({
      title: "Resume saved",
      description: "Your resume has been successfully saved locally.",
    });
  };

  // Mutations
  const saveResumeMutation = useMutation({
    mutationFn: saveResume,
    onSuccess: () => {
      toast({
        title: "Resume saved",
        description: "Your resume has been successfully saved to the database.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving resume",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const fetchResumeMutation = useMutation({
    mutationFn: getResumeData,
    onSuccess: (res) => {
      if (res?.id) {
        setResume(res.content);
        reset(res.content);
        toast({
          title: "Resume data fetched",
          description:
            "Your resume data has been successfully fetched from the database.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error fetching resume data",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resumeFeedbackMutation = useMutation({
    mutationFn: analyzeResume,
    onSuccess: (res) => {
      toast({
        title: "Resume feedback generated",
        description: "Your resume has been successfully analyzed.",
      });

      setFeedbackData(res);
    },
    onError: (error) => {
      toast({
        title: "Error generating resume feedback",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const saveResumeToServer = async (resumeData) => {
    if (!resumeData) {
      toast({
        title: "No resume data to save.",
        description: "Please fill in the form before saving.",
        variant: "destructive",
      });
      return;
    }

    saveResumeMutation.mutate(resumeData);
  };

  const getResumeFromServer = async () => {
    fetchResumeMutation.mutate();
  };

  const generateResumeFeedback = async (resumeData) => {
    if (!resumeData) {
      toast({
        title: "No resume data",
        description: "Please fill in the form before generating feedback.",
        variant: "destructive",
      });
      return;
    }

    resumeFeedbackMutation.mutate(resumeData);
  };

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem("resume");
      if (!storedResume) return;

      const parsedData = JSON.parse(storedResume);
      if (parsedData && typeof parsedData === "object") {
        setResume(parsedData);
        reset(parsedData);

        setTimeout(() => {
          toast({
            title: "Resume data loaded",
            description:
              "Your resume data has been successfully loaded from local storage.",
          });
        }, 100); // 100ms delay to ensure hydration is complete
      }
    } catch (error) {
      console.error("Failed to load resume from localStorage:", error);
    }
  }, []);

  const handlePrint = async () => {
    try {
      setIsGenerating(true);

      const input = templateRef.current;

      if (!input) {
        toast({
          title: "Oops! Something went wrong.",
          description:
            "Failed to generate PDF, please select a template and try again.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      // Convert to canvas
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // PDF settings
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      let imgWidth = pdfWidth;
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;

      // Split into multiple pages if content is too long
      while (position + imgHeight > pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        position -= pdfHeight;
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {(fetchResumeMutation.isPending ||
        saveResumeMutation.isPending ||
        resumeFeedbackMutation.isPending) && <FullScreenSpinner />}

      <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {activeTab === "form" && (
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                variant="outline"
              >
                {isSubmitting ? (
                  <Spinner className={"size-4"} />
                ) : (
                  "Save Locally"
                )}{" "}
                <Laptop />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={getResumeFromServer}
                    disabled={
                      isSubmitting ||
                      fetchResumeMutation.isPending ||
                      resumeFeedbackMutation.isPending
                    }
                  >
                    <Download /> Load from Cloud
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => saveResumeToServer(resume)}
                    disabled={
                      isSubmitting ||
                      !isSubmitted ||
                      !isValid ||
                      saveResumeMutation.isPending ||
                      resumeFeedbackMutation.isPending ||
                      fetchResumeMutation.isPending
                    }
                  >
                    <Upload /> Save to Cloud
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => generateResumeFeedback(resume)}
                    disabled={
                      isSubmitting ||
                      !resume ||
                      !isValid ||
                      saveResumeMutation.isPending ||
                      resumeFeedbackMutation.isPending
                    }
                  >
                    <Sparkles /> AI Feedback
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {activeTab === "preview" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handlePrint()}
                    disabled={isGenerating}
                  >
                    Download Resume {isGenerating ? <Spinner /> : <Download />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <TabsContent value="form">
          <div className={`grid ${feedbackData && "grid-cols-2"} gap-8`}>
            <ResumeForm form={form} />
            {feedbackData && <ResumeFeedback feedbackData={feedbackData} />}
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <ResumePreview
            resume={resume || sampleResumeData}
            templateOneRef={templateRef}
            templateTwoRef={templateRef}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
