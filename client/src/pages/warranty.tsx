import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, FileCheck, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { warrantyFormSchema, type WarrantyFormData } from "@shared/schema";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

export default function Warranty() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<WarrantyFormData>({
    resolver: zodResolver(warrantyFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      service: "",
      registrationNo: "",
      vehicleBrand: "",
      vehicleModel: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WarrantyFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (selectedFile) {
        formData.append("invoice", selectedFile);
      }

      const response = await fetch("/api/warranty", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to register warranty");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your warranty has been registered successfully.",
      });
      form.reset();
      setSelectedFile(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: WarrantyFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            REVIVE & REFRESH YOUR RIDE
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="text-2xl text-primary font-orbitron font-bold mb-6">REGISTER WARRANTY TODAY!</motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground">
            Ensure your vehicle's protection is officially recorded. Fill out the form below to activate your warranty.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          className="max-w-3xl mx-auto bg-black/50 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-md shadow-2xl hover-glow"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-orbitron font-bold text-white border-b border-white/10 pb-2">Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" className="bg-white/5 border-white/10" data-testid="input-warranty-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10" data-testid="input-warranty-phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@domain.com" className="bg-white/5 border-white/10" data-testid="input-warranty-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" className="bg-white/5 border-white/10" data-testid="input-warranty-city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Maharashtra" className="bg-white/5 border-white/10" data-testid="input-warranty-state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-orbitron font-bold text-white border-b border-white/10 pb-2">Vehicle & Service Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Availed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10" data-testid="select-warranty-service">
                              <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Paint Protection Film (PPF)">Paint Protection Film (PPF)</SelectItem>
                            <SelectItem value="Ceramic Coating">Ceramic Coating</SelectItem>
                            <SelectItem value="Body Wrap">Body Wrap</SelectItem>
                            <SelectItem value="Sun Control Film">Sun Control Film</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration No.</FormLabel>
                        <FormControl>
                          <Input placeholder="MH 01 AB 1234" className="bg-white/5 border-white/10 uppercase" data-testid="input-warranty-registration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleBrand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. BMW, Audi, Tata" className="bg-white/5 border-white/10" data-testid="input-warranty-brand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3 Series, Q7, Safari" className="bg-white/5 border-white/10" data-testid="input-warranty-model" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-orbitron font-bold text-white border-b border-white/10 pb-2">Documentation</h3>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  data-testid="input-warranty-invoice"
                />
                {selectedFile ? (
                  <div className="border border-primary/50 bg-primary/10 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-white font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button type="button" size="icon" variant="ghost" onClick={removeFile} data-testid="button-remove-file">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5"
                    data-testid="button-upload-invoice"
                  >
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-white font-medium">Upload Invoice Copy</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF (Max 5MB)</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg uppercase tracking-widest shadow-lg shadow-primary/20"
                  data-testid="button-submit-warranty"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registering...
                    </>
                  ) : (
                    <>
                      <FileCheck className="mr-2 h-5 w-5" /> Register Warranty
                    </>
                  )}
                </Button>
              </motion.div>

            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
