---
title: Loosening the Legacy Grip in Financial Services
date: 2026-05-10
description: Findings from research done across two quarters at Stanford
---

## Introduction

My time at Capital One prior to business school acquainted me with legacy core banking infrastructure. "Core banking infrastructure" refers to the systems that power critical bank activities such as: 
- Managing accounts and customers
- Processing deposits 
- Issuing all types of loans
- Reporting for financial and regulatory use cases

"Legacy" refers to the fact that many of these systems were originally written in COBOL, or COmmon Business-Oriented Language, a programming language created in the 1950s. Engineers trained in COBOL are approaching retirement, and many universities no longer teach the language, creating a dearth of experts who understand core banking systems. Besides being written in an archaic language, these core banking systems often operate in batch cycles and are monolithic. This poses challenges when banks want to integrate their cores with other modern pieces of technology, which are often cloud-based, modular, and operate in real-time. 

It should be no surprise then that bank executives increasingly view legacy core banking systems as rate-limiters to innovation. Banks are spending significant resources to modernize these systems, yet see limited success. Geoff Hudson-Searle (former Citibank executive) estimates that 75% of all COBOL rewrite projects have resulted in failure. When they do succeed, they are expensive: Commonwealth Bank of Australia took 5 years and $750M to replace and modernize its core banking platform, requiring the help of Accenture and SAP. 

When I got to Stanford, I wanted to better understand why these transformations are so painful, and whether recent advances with large language models could alleviate some of the pain associated with legacy cores and loosen the legacy grip. The following is a narrative of my approach and learnings over the course of 30+ conversations with COBOL developers, bank IT executives, and systems integrators. 

## Chesterton's Fence
