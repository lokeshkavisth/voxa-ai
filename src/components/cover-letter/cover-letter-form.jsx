"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { generateCoverLetter } from "@/actions/cover-letter-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { coverLetterSchema } from "@/lib/schemas/cover-letter-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PenTool } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CoverLetterForm = () => {
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState(null);

  const form = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      companyName: "",
      jobRole: "",
      jobDescription: "",
      tone: "formal",
      length: "short",
    },
  });

  const mutation = useMutation({
    mutationFn: generateCoverLetter,
    onSuccess: (data) => {
      toast({
        title: "Cover letter generated",
        description: "Your cover letter has been successfully generated.",
      });
      console.log(data);
      setGeneratedCoverLetter(data);
    },
    onError: (error) => {
      toast({
        title: "Error generating cover letter",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values) {
    mutation.mutate(values);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Generate Your Cover Letter</CardTitle>
          <CardDescription>
            Fill in the details to create a personalized cover letter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input placeholder="Enter company name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input placeholder="Enter job role" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Textarea
                          placeholder="Enter job description"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Provide key details from the job posting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="enthusiastic">
                            Enthusiastic
                          </SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="concise">Concise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the tone for your cover letter
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the length for your cover letter
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Generating..." : "Generate Cover Letter"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Generated Cover Letter</CardTitle>
          <CardDescription>
            Your personalized cover letter will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedCoverLetter ? (
            <Textarea
              value={generatedCoverLetter}
              readOnly
              className="h-[400px] font-mono text-sm"
            />
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-muted rounded-md">
              <PenTool className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!generatedCoverLetter}>
            Copy to Clipboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoverLetterForm;
