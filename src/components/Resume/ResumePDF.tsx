"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TailoredResume } from "@/lib/schemas/resumeSchema";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#27272a" 
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d8",
    paddingBottom: 15,
    alignItems: "center"
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 6,
    color: "#09090b",
    letterSpacing: 1,
  },
  contact: {
    flexDirection: "row",
    fontSize: 9,
    color: "#52525b",
    gap: 8,
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 3,
    marginBottom: 6,
    color: "#18181b",
    letterSpacing: 0.5,
  },
  text: {
    lineHeight: 1.5,
    marginBottom: 4
  },
  jobTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2
  },
  jobCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,    
  },
  jobDate: {
    color: "#71717a",
    fontSize: 9,
  }
});

export const ResumePDF = ({ data }: { data: TailoredResume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.basics?.name || "YOUR NAME"}</Text>
        <View style={styles.contact}>
          <Text>{data.basics?.email || "email@example.com"}</Text>
          {data.basics?.phone && <Text> • {data.basics.phone}</Text>}
          {data.basics?.location?.city && <Text> • {data.basics.location.city}</Text>}
          {data.basics?.url && <Text> • {data.basics.url}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
             <View key={i} style={{ marginBottom: 8 }}>
               <View style={styles.jobTitleRow}>
                  <Text style={styles.jobCompany}>{exp.role} at {exp.company}</Text>
                  <Text style={styles.jobDate}>{exp.duration}</Text>
               </View>
               <Text style={styles.text}>{exp.description}</Text>
             </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
             <View key={i} style={styles.jobTitleRow}>
                <Text style={styles.text}><Text style={styles.jobCompany}>{edu.institution}</Text> — {edu.degree}</Text>
                <Text style={styles.jobDate}>{edu.year}</Text>
             </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.text}>{data.skills.join(", ")}</Text>
        </View>
      )}
    </Page>
  </Document>
);
