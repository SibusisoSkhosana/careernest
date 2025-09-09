import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Eye, Wand2 } from "lucide-react";

interface CoverLetterData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
  };
  jobDetails: {
    jobTitle: string;
    companyName: string;
    hiringManager: string;
    jobReference: string;
    industry: string;
  };
  content: {
    introduction: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    closing: string;
  };
  tone: string;
}

const CoverLetterGenerator = () => {
  const [showPreview, setShowPreview] = useState(false);
  
  const [letterData, setLetterData] = useState<CoverLetterData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: ""
    },
    jobDetails: {
      jobTitle: "",
      companyName: "",
      hiringManager: "",
      jobReference: "",
      industry: ""
    },
    content: {
      introduction: "",
      bodyParagraph1: "",
      bodyParagraph2: "",
      closing: ""
    },
    tone: "professional"
  });

  const toneOptions = [
    { value: "professional", label: "Professional", description: "Formal and business-like" },
    { value: "enthusiastic", label: "Enthusiastic", description: "Energetic and passionate" },
    { value: "confident", label: "Confident", description: "Assertive and self-assured" },
    { value: "warm", label: "Warm", description: "Friendly yet professional" }
  ];

  const industryTemplates = {
    technology: {
      introduction: "I am writing to express my strong interest in the {jobTitle} position at {companyName}. With my passion for technology and proven ability to adapt to new digital challenges, I am excited about the opportunity to contribute to your innovative team.",
      bodyParagraph1: "In my previous roles, I have developed strong technical skills and problem-solving abilities that align perfectly with the requirements of this position. I have experience working with modern technologies and am always eager to learn new tools and frameworks that drive business success.",
      bodyParagraph2: "What particularly excites me about {companyName} is your commitment to innovation and technological advancement. I am impressed by your recent projects and would welcome the opportunity to contribute my skills to help achieve your company's ambitious goals.",
      closing: "I would welcome the opportunity to discuss how my technical skills and enthusiasm can contribute to {companyName}'s continued success. Thank you for considering my application."
    },
    healthcare: {
      introduction: "I am writing to apply for the {jobTitle} position at {companyName}. With my dedication to providing excellent patient care and my commitment to making a positive impact in healthcare, I am excited about the opportunity to join your team.",
      bodyParagraph1: "Throughout my career, I have demonstrated strong interpersonal skills, attention to detail, and the ability to work effectively in fast-paced healthcare environments. My experience has taught me the importance of compassion, professionalism, and continuous learning in delivering quality care.",
      bodyParagraph2: "I am particularly drawn to {companyName} because of your reputation for excellence in patient care and your commitment to community health. I believe my values align perfectly with your organization's mission to provide compassionate, high-quality healthcare services.",
      closing: "I would be honored to contribute to your team's mission of providing exceptional healthcare. Thank you for considering my application, and I look forward to the opportunity to discuss how I can support your organization's goals."
    },
    education: {
      introduction: "I am excited to submit my application for the {jobTitle} position at {companyName}. With my passion for education and commitment to fostering student growth, I am eager to contribute to your institution's mission of educational excellence.",
      bodyParagraph1: "My experience in education has equipped me with strong communication skills, creativity in lesson planning, and the ability to connect with students from diverse backgrounds. I believe in creating inclusive learning environments where every student can thrive and reach their full potential.",
      bodyParagraph2: "What attracts me to {companyName} is your innovative approach to education and commitment to student success. I am impressed by your programs and would be excited to contribute to your mission of preparing students for future success.",
      closing: "I would welcome the opportunity to discuss how my educational philosophy and experience can contribute to your institution's continued excellence. Thank you for considering my application."
    },
    business: {
      introduction: "I am writing to express my interest in the {jobTitle} position at {companyName}. With my strong business acumen and proven track record of driving results, I am excited about the opportunity to contribute to your organization's success.",
      bodyParagraph1: "In my previous roles, I have demonstrated the ability to analyze complex business challenges, develop strategic solutions, and work collaboratively with cross-functional teams. My experience has given me a solid foundation in business operations and a keen understanding of what drives organizational success.",
      bodyParagraph2: "I am particularly impressed by {companyName}'s reputation for innovation and market leadership. Your commitment to excellence and customer satisfaction aligns perfectly with my professional values and career aspirations.",
      closing: "I would appreciate the opportunity to discuss how my business experience and strategic thinking can contribute to {companyName}'s continued growth. Thank you for your time and consideration."
    }
  };

  const generateTemplate = () => {
    if (!letterData.jobDetails.industry) return;

    const template = industryTemplates[letterData.jobDetails.industry as keyof typeof industryTemplates];
    if (!template) return;

    const replacePlaceholders = (text: string) => {
      return text
        .replace(/{jobTitle}/g, letterData.jobDetails.jobTitle || "[Job Title]")
        .replace(/{companyName}/g, letterData.jobDetails.companyName || "[Company Name]");
    };

    setLetterData(prev => ({
      ...prev,
      content: {
        introduction: replacePlaceholders(template.introduction),
        bodyParagraph1: replacePlaceholders(template.bodyParagraph1),
        bodyParagraph2: replacePlaceholders(template.bodyParagraph2),
        closing: replacePlaceholders(template.closing)
      }
    }));
  };

  const downloadCoverLetter = () => {
    const currentDate = new Date().toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const letterHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${letterData.personalInfo.fullName} - Cover Letter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 40px; color: #333; max-width: 800px; }
        .header { margin-bottom: 40px; }
        .sender-info { margin-bottom: 30px; }
        .date { margin-bottom: 20px; }
        .recipient-info { margin-bottom: 30px; }
        .content { margin-bottom: 30px; }
        .content p { margin-bottom: 15px; }
        .signature { margin-top: 40px; }
        h2 { color: #475569; margin-bottom: 10px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="sender-info">
          <strong>${letterData.personalInfo.fullName}</strong><br>
          ${letterData.personalInfo.address}<br>
          ${letterData.personalInfo.city}, ${letterData.personalInfo.province}<br>
          ${letterData.personalInfo.email}<br>
          ${letterData.personalInfo.phone}
        </div>
        
        <div class="date">${currentDate}</div>
        
        <div class="recipient-info">
          ${letterData.jobDetails.hiringManager ? `${letterData.jobDetails.hiringManager}<br>` : ''}
          ${letterData.jobDetails.companyName}<br>
          ${letterData.jobDetails.jobReference ? `Reference: ${letterData.jobDetails.jobReference}<br>` : ''}
        </div>
      </div>

      <div class="content">
        <p>Dear ${letterData.jobDetails.hiringManager || 'Hiring Manager'},</p>
        
        <p>${letterData.content.introduction}</p>
        
        <p>${letterData.content.bodyParagraph1}</p>
        
        <p>${letterData.content.bodyParagraph2}</p>
        
        <p>${letterData.content.closing}</p>
      </div>

      <div class="signature">
        <p>Sincerely,</p>
        <br>
        <p>${letterData.personalInfo.fullName}</p>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([letterHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letterData.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showPreview) {
    const currentDate = new Date().toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Cover Letter Preview</h1>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    Back to Editor
                  </Button>
                  <Button onClick={downloadCoverLetter} className="bg-gradient-to-r from-slate-600 to-slate-800">
                    <Download className="h-4 w-4 mr-2" />
                    Download Letter
                  </Button>
                </div>
              </div>

              <Card className="p-12 bg-white shadow-lg">
                <div className="space-y-8">
                  <div>
                    <div className="font-bold text-lg">{letterData.personalInfo.fullName}</div>
                    <div className="text-slate-600">
                      {letterData.personalInfo.address}<br />
                      {letterData.personalInfo.city}, {letterData.personalInfo.province}<br />
                      {letterData.personalInfo.email}<br />
                      {letterData.personalInfo.phone}
                    </div>
                  </div>

                  <div className="text-slate-600">{currentDate}</div>

                  <div>
                    {letterData.jobDetails.hiringManager && (
                      <div className="font-semibold">{letterData.jobDetails.hiringManager}</div>
                    )}
                    <div className="font-semibold">{letterData.jobDetails.companyName}</div>
                    {letterData.jobDetails.jobReference && (
                      <div className="text-sm text-slate-600">Reference: {letterData.jobDetails.jobReference}</div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <p>Dear {letterData.jobDetails.hiringManager || 'Hiring Manager'},</p>
                    
                    <p>{letterData.content.introduction}</p>
                    
                    <p>{letterData.content.bodyParagraph1}</p>
                    
                    <p>{letterData.content.bodyParagraph2}</p>
                    
                    <p>{letterData.content.closing}</p>
                  </div>

                  <div className="space-y-4">
                    <p>Sincerely,</p>
                    <div className="pt-8">
                      <p className="font-semibold">{letterData.personalInfo.fullName}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                Professional Cover Letter Generator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Create compelling cover letters that get you noticed. Our AI-powered generator helps you craft personalized letters for any job application.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your contact details for the letter header</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={letterData.personalInfo.fullName}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                          }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={letterData.personalInfo.email}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value }
                          }))}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={letterData.personalInfo.phone}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value }
                          }))}
                          placeholder="+27 12 345 6789"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={letterData.personalInfo.city}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, city: e.target.value }
                          }))}
                          placeholder="Cape Town"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={letterData.personalInfo.address}
                        onChange={(e) => setLetterData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, address: e.target.value }
                        }))}
                        placeholder="123 Main Street"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Job Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Information about the position you're applying for</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          value={letterData.jobDetails.jobTitle}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            jobDetails: { ...prev.jobDetails, jobTitle: e.target.value }
                          }))}
                          placeholder="Software Developer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={letterData.jobDetails.companyName}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            jobDetails: { ...prev.jobDetails, companyName: e.target.value }
                          }))}
                          placeholder="Tech Company Ltd"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hiringManager">Hiring Manager</Label>
                        <Input
                          id="hiringManager"
                          value={letterData.jobDetails.hiringManager}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            jobDetails: { ...prev.jobDetails, hiringManager: e.target.value }
                          }))}
                          placeholder="Ms. Sarah Johnson"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobReference">Job Reference</Label>
                        <Input
                          id="jobReference"
                          value={letterData.jobDetails.jobReference}
                          onChange={(e) => setLetterData(prev => ({
                            ...prev,
                            jobDetails: { ...prev.jobDetails, jobReference: e.target.value }
                          }))}
                          placeholder="JOB-2024-001"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={letterData.jobDetails.industry}
                        onValueChange={(value) => setLetterData(prev => ({
                          ...prev,
                          jobDetails: { ...prev.jobDetails, industry: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry for template suggestions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="business">Business & Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Letter Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Letter Content
                      {letterData.jobDetails.industry && (
                        <Button onClick={generateTemplate} variant="outline" size="sm">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Template
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>Craft your personalized cover letter content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="introduction">Opening Paragraph *</Label>
                      <Textarea
                        id="introduction"
                        value={letterData.content.introduction}
                        onChange={(e) => setLetterData(prev => ({
                          ...prev,
                          content: { ...prev.content, introduction: e.target.value }
                        }))}
                        placeholder="Introduce yourself and state your interest in the position..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bodyParagraph1">Body Paragraph 1 *</Label>
                      <Textarea
                        id="bodyParagraph1"
                        value={letterData.content.bodyParagraph1}
                        onChange={(e) => setLetterData(prev => ({
                          ...prev,
                          content: { ...prev.content, bodyParagraph1: e.target.value }
                        }))}
                        placeholder="Highlight your relevant experience and skills..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bodyParagraph2">Body Paragraph 2 *</Label>
                      <Textarea
                        id="bodyParagraph2"
                        value={letterData.content.bodyParagraph2}
                        onChange={(e) => setLetterData(prev => ({
                          ...prev,
                          content: { ...prev.content, bodyParagraph2: e.target.value }
                        }))}
                        placeholder="Explain why you're interested in the company and how you can contribute..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="closing">Closing Paragraph *</Label>
                      <Textarea
                        id="closing"
                        value={letterData.content.closing}
                        onChange={(e) => setLetterData(prev => ({
                          ...prev,
                          content: { ...prev.content, closing: e.target.value }
                        }))}
                        placeholder="Express your enthusiasm and request for an interview..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Tone Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Letter Tone</CardTitle>
                    <CardDescription>Choose the tone that best fits the position</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {toneOptions.map((option) => (
                        <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="tone"
                            value={option.value}
                            checked={letterData.tone === option.value}
                            onChange={(e) => setLetterData(prev => ({ ...prev, tone: e.target.value }))}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Template Suggestions */}
                {letterData.jobDetails.industry && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Industry Templates</CardTitle>
                      <CardDescription>Quick templates for {letterData.jobDetails.industry}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={generateTemplate} className="w-full">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate {letterData.jobDetails.industry.charAt(0).toUpperCase() + letterData.jobDetails.industry.slice(1)} Template
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Preview Button */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preview & Download</CardTitle>
                    <CardDescription>Review your cover letter before downloading</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={() => setShowPreview(true)} className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Letter
                    </Button>
                    <Button onClick={downloadCoverLetter} className="w-full bg-gradient-to-r from-slate-600 to-slate-800">
                      <Download className="h-4 w-4 mr-2" />
                      Download Letter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoverLetterGenerator;