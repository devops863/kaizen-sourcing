import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { useCreateApplication } from "@/hooks/use-applications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Steps } from "./ui/steps";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowRight, ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Extend the schema for frontend-specific validations or coercions if needed
// For now, we use the shared schema directly but might need to handle empty strings as undefined in some cases
const formSchema = insertApplicationSchema;

const steps = [
  "Personal Info",
  "Employment",
  "Documents",
  "Payment",
  "Consent",
  "Review"
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const createApplication = useCreateApplication();

  const form = useForm<InsertApplication>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      niNumber: "",
      email: "",
      contactNumber: "",
      address: "",
      houseNumber: "",
      postcode: "",
      agencyRegistration: "",
      startDate: "",
      jobTitle: "",
      agencyCompany: "Kaizen Sourcing",
      payRate: "",
      residence: "",
      documents: [],
      bankName: "",
      accountName: "",
      accountNumber: "",
      sortCode: "",
      employeeType: "",
      consentTransactional: false,
      consentMarketing: false,
      description: "",
      timeScale: "",
    },
    mode: "onChange",
  });

  // Function to validate current step before proceeding
  const nextStep = async () => {
    let fieldsToValidate: (keyof InsertApplication)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['firstName', 'lastName', 'dob', 'niNumber', 'email', 'contactNumber', 'address', 'houseNumber', 'postcode'];
        break;
      case 2:
        fieldsToValidate = ['agencyRegistration', 'startDate', 'jobTitle', 'agencyCompany', 'payRate', 'residence'];
        break;
      case 3:
        // Document upload is optional for MVP demo, or just basic
        fieldsToValidate = []; 
        break;
      case 4:
        fieldsToValidate = ['bankName', 'accountName', 'accountNumber', 'sortCode', 'employeeType'];
        break;
      case 5:
        fieldsToValidate = ['consentTransactional', 'consentMarketing'];
        break;
      case 6:
        fieldsToValidate = ['description', 'timeScale']; // Optional but good to check types
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = (data: InsertApplication) => {
    createApplication.mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        toast({
          title: "Application Submitted",
          description: "We've received your details and will be in touch shortly.",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary animate-fade-in">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Application Received!</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Thank you for applying with Kaizen Sourcing. Our recruitment team will review your details and contact you within 24 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>Start New Application</Button>
            <Button onClick={() => window.location.href = "/"}>Return Home</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl bg-white/95 backdrop-blur border-0 ring-1 ring-black/5">
      <CardHeader className="pb-0 pt-8 px-6 md:px-10">
        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
          Start Your Application
        </CardTitle>
        <CardDescription className="text-base text-gray-500 mt-2">
          Complete the steps below to register for top construction roles.
        </CardDescription>
        <div className="mt-8">
          <Steps currentStep={currentStep} totalSteps={steps.length} labels={steps} />
        </div>
      </CardHeader>
      
      <CardContent className="p-6 md:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* STEP 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl><Input placeholder="John" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="niNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>National Insurance Number</FormLabel>
                          <FormControl><Input placeholder="QQ 12 34 56 A" {...field} /></FormControl>
                          <FormDescription className="text-xs">Required for UK employment verification.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input placeholder="07123 456789" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode</FormLabel>
                          <FormControl><Input placeholder="SW1A 1AA" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House/Flat Number</FormLabel>
                          <FormControl><Input placeholder="42" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl><Input placeholder="123 Construction Road" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 2: Employment Details */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Job Title / Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Labourer">General Labourer</SelectItem>
                              <SelectItem value="Carpenter">Carpenter / Joiner</SelectItem>
                              <SelectItem value="Electrician">Electrician</SelectItem>
                              <SelectItem value="Plumber">Plumber</SelectItem>
                              <SelectItem value="Bricklayer">Bricklayer</SelectItem>
                              <SelectItem value="Painter">Painter & Decorator</SelectItem>
                              <SelectItem value="Site Manager">Site Manager</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agencyRegistration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Registration Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="New">New Registration</SelectItem>
                              <SelectItem value="Existing">Existing Candidate</SelectItem>
                              <SelectItem value="Re-registering">Re-registering</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Start Date</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Pay Rate (£/hr)</FormLabel>
                          <FormControl><Input placeholder="e.g. 15.00" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="residence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UK Residence Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Citizen">UK Citizen</SelectItem>
                              <SelectItem value="Settled">Settled Status</SelectItem>
                              <SelectItem value="Pre-settled">Pre-settled Status</SelectItem>
                              <SelectItem value="Visa">Work Visa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agencyCompany"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2 hidden">
                          <FormLabel>Agency</FormLabel>
                          <FormControl><Input {...field} disabled /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 3: Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6 text-center py-8">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Upload Documents</h3>
                      <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                        Please verify your identity. Upload a copy of your ID (Passport/Driving License) and CSCS Card.
                      </p>
                      <Button variant="outline" className="mt-6 pointer-events-none">Choose Files</Button>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      *For this demo, document upload is simulated. You can proceed without uploading.
                    </p>
                  </div>
                )}

                {/* STEP 4: Payment Details */}
                {currentStep === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="employeeType"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Payment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PAYE">PAYE</SelectItem>
                              <SelectItem value="CIS">CIS (Construction Industry Scheme)</SelectItem>
                              <SelectItem value="Umbrella">Umbrella Company</SelectItem>
                              <SelectItem value="LTD">Limited Company</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl><Input placeholder="e.g. Barclays" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl><Input placeholder="Mr John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sortCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sort Code</FormLabel>
                          <FormControl><Input placeholder="00-00-00" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl><Input placeholder="12345678" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 5: Consent */}
                {currentStep === 5 && (
                  <div className="space-y-6 py-4">
                    <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-2">GDPR & Data Protection</h4>
                      <p className="text-sm text-blue-800/80 mb-4">
                        We take your privacy seriously. Your data is processed securely and only used for recruitment purposes in accordance with our Privacy Policy.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="consentTransactional"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium cursor-pointer">
                              I consent to processing my personal data for job applications
                            </FormLabel>
                            <FormDescription>
                              Required to process your application and contact you about roles.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consentMarketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium cursor-pointer">
                              Receive job alerts and industry news
                            </FormLabel>
                            <FormDescription>
                              We'll send you relevant opportunities via email/SMS. You can opt out anytime.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 6: Additional Info & Review */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information / Skills</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your experience, specific tickets (CSCS, IPAF, etc), or preferences..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeScale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When can you start?</FormLabel>
                          <FormControl><Input placeholder="Immediately / 1 week notice" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
                      <p className="text-sm text-yellow-800 font-medium text-center">
                        Please review your details before submitting. By clicking 'Submit Application', you confirm all information is accurate.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6 border-t mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || createApplication.isPending}
                className="w-32"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {currentStep < steps.length ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="w-32 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={createApplication.isPending}
                  className="w-48 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                >
                  {createApplication.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
