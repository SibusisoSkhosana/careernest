import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Eye, Plus, Trash2 } from "lucide-react";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  institution: string;
  qualification: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    linkedin: string;
    website: string;
  };
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: string[];
  achievements: string[];
  references: string;
}

const CVGenerator = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      linkedin: "",
      website: ""
    },
    professionalSummary: "",
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    achievements: [],
    references: ""
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const addWorkExperience = () => {
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }]
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: "",
        qualification: "",
        startDate: "",
        endDate: "",
        current: false
      }]
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setCvData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage("");
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setCvData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement("");
    }
  };

  const removeSkill = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const removeLanguage = (index: number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const removeAchievement = (index: number) => {
    setCvData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const downloadCV = () => {
    // Create CV content as HTML
    const cvHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${cvData.personalInfo.fullName} - CV</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.4; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #475569; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 32px; font-weight: bold; color: #475569; margin-bottom: 10px; }
        .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; }
        .work-item, .edu-item { margin-bottom: 15px; }
        .item-header { font-weight: bold; color: #475569; }
        .item-meta { color: #64748b; font-size: 14px; margin-bottom: 5px; }
        .skills, .languages, .achievements { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 14px; color: #475569; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${cvData.personalInfo.fullName}</div>
        <div class="contact">
          <span>${cvData.personalInfo.email}</span>
          <span>${cvData.personalInfo.phone}</span>
          <span>${cvData.personalInfo.city}, ${cvData.personalInfo.province}</span>
          ${cvData.personalInfo.linkedin ? `<span>${cvData.personalInfo.linkedin}</span>` : ''}
        </div>
      </div>

      ${cvData.professionalSummary ? `
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${cvData.professionalSummary}</p>
      </div>
      ` : ''}

      ${cvData.workExperience.length > 0 ? `
      <div class="section">
        <div class="section-title">Work Experience</div>
        ${cvData.workExperience.map(exp => `
          <div class="work-item">
            <div class="item-header">${exp.position} - ${exp.company}</div>
            <div class="item-meta">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${cvData.education.length > 0 ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${cvData.education.map(edu => `
          <div class="edu-item">
            <div class="item-header">${edu.qualification}</div>
            <div class="item-meta">${edu.institution} - ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${cvData.skills.length > 0 ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
          ${cvData.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      ${cvData.languages.length > 0 ? `
      <div class="section">
        <div class="section-title">Languages</div>
        <div class="languages">
          ${cvData.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      ${cvData.achievements.length > 0 ? `
      <div class="section">
        <div class="section-title">Achievements</div>
        <ul>
          ${cvData.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      ${cvData.references ? `
      <div class="section">
        <div class="section-title">References</div>
        <p>${cvData.references}</p>
      </div>
      ` : ''}
    </body>
    </html>
    `;

    // Create and download the file
    const blob = new Blob([cvHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">CV Preview</h1>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    Back to Editor
                  </Button>
                  <Button onClick={downloadCV} className="bg-gradient-to-r from-slate-600 to-slate-800">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </div>

              <Card className="p-8 bg-white shadow-lg">
                <div className="text-center border-b-2 border-slate-600 pb-6 mb-8">
                  <h1 className="text-4xl font-bold text-slate-800 mb-4">{cvData.personalInfo.fullName}</h1>
                  <div className="flex justify-center gap-6 text-slate-600 flex-wrap">
                    <span>{cvData.personalInfo.email}</span>
                    <span>{cvData.personalInfo.phone}</span>
                    <span>{cvData.personalInfo.city}, {cvData.personalInfo.province}</span>
                    {cvData.personalInfo.linkedin && <span>{cvData.personalInfo.linkedin}</span>}
                  </div>
                </div>

                {cvData.professionalSummary && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Professional Summary</h2>
                    <p className="text-slate-700">{cvData.professionalSummary}</p>
                  </div>
                )}

                {cvData.workExperience.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Work Experience</h2>
                    {cvData.workExperience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-bold text-slate-800">{exp.position} - {exp.company}</h3>
                        <p className="text-slate-600 text-sm mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                        <p className="text-slate-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {cvData.education.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Education</h2>
                    {cvData.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-bold text-slate-800">{edu.qualification}</h3>
                        <p className="text-slate-600 text-sm">{edu.institution} - {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}

                {cvData.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.languages.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Languages</h2>
                    <div className="flex flex-wrap gap-2">
                      {cvData.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.achievements.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">Achievements</h2>
                    <ul className="list-disc list-inside text-slate-700">
                      {cvData.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cvData.references && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">References</h2>
                    <p className="text-slate-700">{cvData.references}</p>
                  </div>
                )}
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
                Professional CV Generator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Create a professional CV that stands out to employers. Fill in your details and generate a polished document ready for download.
              </p>
            </div>

            <div className="flex justify-end mb-6">
              <Button onClick={() => setShowPreview(true)} className="bg-gradient-to-r from-slate-600 to-slate-800">
                <Eye className="h-4 w-4 mr-2" />
                Preview CV
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Build Your CV</CardTitle>
                <CardDescription>
                  Complete each section to create your professional curriculum vitae
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={cvData.personalInfo.fullName}
                          onChange={(e) => setCvData(prev => ({
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
                          value={cvData.personalInfo.email}
                          onChange={(e) => setCvData(prev => ({
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
                          value={cvData.personalInfo.phone}
                          onChange={(e) => setCvData(prev => ({
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
                          value={cvData.personalInfo.city}
                          onChange={(e) => setCvData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, city: e.target.value }
                          }))}
                          placeholder="Cape Town"
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Province *</Label>
                        <Select
                          value={cvData.personalInfo.province}
                          onValueChange={(value) => setCvData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, province: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                            <SelectItem value="free-state">Free State</SelectItem>
                            <SelectItem value="gauteng">Gauteng</SelectItem>
                            <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                            <SelectItem value="limpopo">Limpopo</SelectItem>
                            <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                            <SelectItem value="northern-cape">Northern Cape</SelectItem>
                            <SelectItem value="north-west">North West</SelectItem>
                            <SelectItem value="western-cape">Western Cape</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={cvData.personalInfo.linkedin}
                          onChange={(e) => setCvData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                          }))}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="professionalSummary">Professional Summary</Label>
                      <Textarea
                        id="professionalSummary"
                        value={cvData.professionalSummary}
                        onChange={(e) => setCvData(prev => ({ ...prev, professionalSummary: e.target.value }))}
                        placeholder="Write a brief summary of your professional background and career objectives..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button onClick={addWorkExperience} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>

                    {cvData.workExperience.map((exp, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor={`company-${index}`}>Company *</Label>
                            <Input
                              id={`company-${index}`}
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...cvData.workExperience];
                                newExp[index].company = e.target.value;
                                setCvData(prev => ({ ...prev, workExperience: newExp }));
                              }}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`position-${index}`}>Position *</Label>
                            <Input
                              id={`position-${index}`}
                              value={exp.position}
                              onChange={(e) => {
                                const newExp = [...cvData.workExperience];
                                newExp[index].position = e.target.value;
                                setCvData(prev => ({ ...prev, workExperience: newExp }));
                              }}
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
                            <Input
                              id={`startDate-${index}`}
                              value={exp.startDate}
                              onChange={(e) => {
                                const newExp = [...cvData.workExperience];
                                newExp[index].startDate = e.target.value;
                                setCvData(prev => ({ ...prev, workExperience: newExp }));
                              }}
                              placeholder="MM/YYYY"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`endDate-${index}`}>End Date</Label>
                            <Input
                              id={`endDate-${index}`}
                              value={exp.endDate}
                              onChange={(e) => {
                                const newExp = [...cvData.workExperience];
                                newExp[index].endDate = e.target.value;
                                setCvData(prev => ({ ...prev, workExperience: newExp }));
                              }}
                              placeholder="MM/YYYY or leave blank if current"
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => {
                                const newExp = [...cvData.workExperience];
                                newExp[index].current = e.target.checked;
                                if (e.target.checked) {
                                  newExp[index].endDate = "";
                                }
                                setCvData(prev => ({ ...prev, workExperience: newExp }));
                              }}
                            />
                            <span>Currently working here</span>
                          </label>
                        </div>
                        <div>
                          <Label htmlFor={`description-${index}`}>Job Description</Label>
                          <Textarea
                            id={`description-${index}`}
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...cvData.workExperience];
                              newExp[index].description = e.target.value;
                              setCvData(prev => ({ ...prev, workExperience: newExp }));
                            }}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newExp = cvData.workExperience.filter((_, i) => i !== index);
                              setCvData(prev => ({ ...prev, workExperience: newExp }));
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button onClick={addEducation} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>

                    {cvData.education.map((edu, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor={`institution-${index}`}>Institution *</Label>
                            <Input
                              id={`institution-${index}`}
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...cvData.education];
                                newEdu[index].institution = e.target.value;
                                setCvData(prev => ({ ...prev, education: newEdu }));
                              }}
                              placeholder="University/School Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`qualification-${index}`}>Qualification *</Label>
                            <Input
                              id={`qualification-${index}`}
                              value={edu.qualification}
                              onChange={(e) => {
                                const newEdu = [...cvData.education];
                                newEdu[index].qualification = e.target.value;
                                setCvData(prev => ({ ...prev, education: newEdu }));
                              }}
                              placeholder="Degree/Certificate"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`eduStartDate-${index}`}>Start Date *</Label>
                            <Input
                              id={`eduStartDate-${index}`}
                              value={edu.startDate}
                              onChange={(e) => {
                                const newEdu = [...cvData.education];
                                newEdu[index].startDate = e.target.value;
                                setCvData(prev => ({ ...prev, education: newEdu }));
                              }}
                              placeholder="YYYY"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                            <Input
                              id={`eduEndDate-${index}`}
                              value={edu.endDate}
                              onChange={(e) => {
                                const newEdu = [...cvData.education];
                                newEdu[index].endDate = e.target.value;
                                setCvData(prev => ({ ...prev, education: newEdu }));
                              }}
                              placeholder="YYYY or leave blank if current"
                              disabled={edu.current}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={edu.current}
                              onChange={(e) => {
                                const newEdu = [...cvData.education];
                                newEdu[index].current = e.target.checked;
                                if (e.target.checked) {
                                  newEdu[index].endDate = "";
                                }
                                setCvData(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                            <span>Currently studying here</span>
                          </label>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newEdu = cvData.education.filter((_, i) => i !== index);
                              setCvData(prev => ({ ...prev, education: newEdu }));
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Skills</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill..."
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-2">
                            {skill}
                            <button onClick={() => removeSkill(index)} className="text-xs">×</button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Languages</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="Add a language..."
                          onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                        />
                        <Button onClick={addLanguage}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cvData.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-2">
                            {language}
                            <button onClick={() => removeLanguage(index)} className="text-xs">×</button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="Add an achievement..."
                          onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                        />
                        <Button onClick={addAchievement}>Add</Button>
                      </div>
                      <div className="space-y-2">
                        {cvData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span>{achievement}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="references">References</Label>
                      <Textarea
                        id="references"
                        value={cvData.references}
                        onChange={(e) => setCvData(prev => ({ ...prev, references: e.target.value }))}
                        placeholder="Available upon request, or list specific references..."
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CVGenerator;