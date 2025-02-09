"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { mcqSchema } from "@/lib/schemas/mcq-schema";
import { getUserDetails } from "@/actions/user-actions";
import { useEffect, useState } from "react";
import { generateMCQs } from "@/actions/mock-practice";
import { toast } from "sonner";

export function QuizPreferencesForm() {
  const router = useRouter();

  const [skills, setSkills] = useState([]);

  const form = useForm({
    resolver: zodResolver(mcqSchema),
    defaultValues: {
      quizType: "multiple-choice",
      skills: [],
      totalQuestions: "10",
      level: "BEGINNER",
    },
  });

  const onSubmit = async (values) => {
    const data = {
      length: values.totalQuestions,
      quizType: values.quizType,
      level: values.level,
      skills: values.skills,
    };

    // const questions = await generateMCQs(data);

    if (true) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    // router.push(`/mock/practice/mcqs?${new URLSearchParams(data).toString()}`);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserDetails();

      if (userDetails.skills.length > 0) {
        setSkills(userDetails.skills);
      }

      console.log(userDetails);
    }

    fetchUserDetails();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Preferences</CardTitle>
        <CardDescription>Customize your practice session</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quizType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quiz type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Multiple Choice (MCQs)
                      </SelectItem>
                      {/* <SelectItem value="flashcards">Flashcards</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, idx) => (
                      <FormField
                        key={idx}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={idx}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(skill)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, skill])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== skill
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {skill}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Questions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of questions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[5, 10, 15, 20, 25].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Start Practice
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
