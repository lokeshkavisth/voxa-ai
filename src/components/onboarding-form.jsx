"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { onboardingSchema } from "@/lib/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateUser } from "@/actions/user-actions";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      toast({
        title: "Onboarding completed.",
        description:
          "You have successfully completed the onboarding process. Welcome aboard!",
      });

      // router.push("/insights");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      industry: "",
      subIndustry: "",
      bio: "",
      experience: "",
      skills: "",
    },
  });

  async function onSubmit(values) {
    if (!values) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill all the required fields.",
      });
      return;
    }

    const industry = values.industry.split(" ").join("-");
    const subIndustry = values.subIndustry.split(" ").join("-");
    const data = {
      ...values,
      industry,
      subIndustry,
    };

    mutation.mutate(data);
  }

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    form.setValue("subIndustry", "");
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us about your professional background
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleIndustryChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedIndustry && (
              <FormField
                control={form.control}
                name="subIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industries
                          .find((i) => i.id === selectedIndustry)
                          ?.subIndustries.map((subIndustry) => (
                            <SelectItem key={subIndustry} value={subIndustry}>
                              {subIndustry}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe your professional background and interests.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter skills separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your skills, separated by commas (e.g., JavaScript,
                    React, Node.js)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Onboarding in progress..."
            : "Complete Onboarding"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;
