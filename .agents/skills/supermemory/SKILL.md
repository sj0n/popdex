---
name: supermemory
description: Instructions for using the Supermemory MCP server for building AI agents with memory and personalization.
---

# SuperMemory MCP Usage Instructions

## Overview

SuperMemory MCP is a universal memory layer that enables persistent context and memory storage across different AI platforms and sessions. It allows you to maintain conversation history, user preferences, and contextual information that can be accessed by any MCP-compatible AI client.

**Key Benefits:**
- Universal memory accessible across all MCP-compatible AI tools (Claude, Cursor, VS Code, etc.)
- Semantic search capabilities for intelligent information retrieval
- Session-based user isolation for privacy
- No login required - authentication via unique private URL
- Completely free to use

## Available Tools

SuperMemory MCP provides four core tools:

### 1. `addMemory` (Add to SuperMemory)
**Purpose:** Store new information, context, or user preferences into memory

**When to Use:**
- User explicitly asks you to remember something
- Important information emerges during conversation (preferences, context, facts)
- User shares personal details worth storing (projects, interests, habits)
- Significant decisions or conclusions are reached
- User provides instructions or configurations to remember

**Parameters:**
- `content` (string): The information to store
- `project_id` (optional): Project/container identifier for organizing memories

**Best Practices:**

✅ DO:
- Before saving memory, always check for list of projects to see if the memory can be added to existing project
- Save complete, self-contained information
- Include context in the memory content itself
- Store user preferences and behaviors
- Capture important decisions and outcomes
- Add memories proactively when significant information appears

❌ DON'T:
- Save redundant or duplicate information
- Store trivial/temporary information
- Assume project IDs without checking
- Save partial information without context

### 2. `search` (Search SuperMemory)
**Purpose:** Retrieve relevant memories using semantic search

**When to Use:**
- User asks about past conversations or information
- Need context from previous interactions
- Searching for user preferences or patterns
- Looking up stored facts or decisions
- Building on previous work or discussions

**Parameters:**
- `query` (string): Semantic search query
- `project_id` (optional): Limit search to specific project

**Best Practices:**

✅ DO:
- Use natural language queries
- Search before making assumptions
- Use semantic matching (search for concepts, not exact words)
- Check memories when continuing previous work
- Search for related context to provide better responses

❌ DON'T:
- Use overly specific or exact-match queries
- Search for information you just stored
- Ignore search results in your response
- Search without incorporating findings

### 3. `getProjects`
**Purpose:** List all available projects and their container tags

**When to Use:**
- Before adding memories to a specific project
- User asks what projects exist
- Need to validate a project ID
- Organizing memories into categories

**Returns:**
- Project IDs in format: `sm_project_{name}`

**Best Practices:**

✅ DO:
- Call this first when working with projects
- Use the exact containerTag returned as the projectId
- List projects when user asks about organization

❌ DON'T:
- Guess or assume project IDs
- Use custom project names without checking
- Skip this step when working with projects

### 4. `whoAmI`
**Purpose:** Get current user information and session details

**When to Use:**
- Verify user identity
- Check session information
- Debugging memory access issues
- Understanding current user context

## Operational Guidelines

### When to Store Memories

**Store Proactively When:**
1. User shares preferences ("I like...", "I prefer...", "I always...")
2. Important decisions are made
3. User provides personal context (projects, roles, background)
4. Technical configurations or settings are discussed
5. User explicitly requests ("remember this", "save this")

**Think of Memory as:**
- A persistent notebook shared across all AI sessions
- A way to provide continuity and personalization
- Context that helps avoid repetition

### When to Search Memories

**Search When:**
1. User references past conversations ("like I mentioned before")
2. Continuing previous work or topics
3. User asks about their preferences or settings
4. Context would improve your response
5. User asks "what do you know about..."

### Semantic Search Tips

SuperMemory uses semantic/vector search, not keyword matching:

❌ Poor: "React framework"
✅ Better: "preferred frontend framework for web development"

❌ Poor: "PayFlow app"
✅ Better: "fintech application project details and features"

❌ Poor: "JavaScript coding"
✅ Better: "programming language preferences and coding style"


## Using project_id Parameter

### Without project_id (Global/General Memories)

**For addMemory:** Stores information in general memory space, accessible from any context

**For search:** Searches in general/unscoped memory space

**Note:** Based on observed behavior, search without `project_id` may NOT search across all projects. It appears to search only general (non-project) memories. To search across multiple projects, you may need to search each project individually.

**Use for:**
- User preferences and personal information
- General knowledge applicable everywhere
- Cross-project insights and patterns
- Information relevant to multiple contexts

### With project_id (Project-Scoped Memories)

**For addMemory:** Stores information tagged to specific project for organization

**For search:** Searches only within that specific project scope

**Use for:**
- Project-specific technical details
- Project context and requirements
- Organized information with clear separation
- When you only want project-related results

**Important:** Always call `getProjects()` first to get valid project IDs. Use the exact `containerTag` value returned as the `project_id`.


## Privacy and Security

- Each user has isolated memory via unique URL
- Memories are private to the user's session
- URL-based authentication (treat URLs as credentials)
- Optional self-hosting for enterprise use
- User controls all stored data

## Common Use Cases

### Personal Assistant
- Store meeting notes and action items
- Remember user's schedule preferences
- Track ongoing projects and tasks
- Recall past decisions and context

### Development Aid
- Remember code style preferences
- Store project architectures
- Track technical decisions and rationale
- Maintain context across coding sessions

### Learning Companion
- Store learning progress and interests
- Remember areas needing review
- Track concepts user struggles with
- Build personalized learning paths

### Research Assistant
- Store research findings and sources
- Remember topics of interest
- Track reading progress
- Connect related information

## Quick Reference

| Tool | Primary Use | Required Params |
|------|-------------|-----------------|
| `addMemory` | Store new information | `content` |
| `search` | Find relevant memories | `query` |
| `getProjects` | List available projects | none |
| `whoAmI` | Get user/session info | none |

## Best Practices Summary

1. **Be Proactive**: Don't wait for "remember this" - store important information naturally
2. **Add Context**: Make memories self-contained with enough context
3. **Search First**: Check existing memories before making assumptions
4. **Use Semantic Queries**: Think concepts, not keywords
5. **Respect Projects**: Always call `getProjects()` before using project IDs
6. **Fail Gracefully**: Memory enhancement shouldn't break core functionality
7. **Avoid Redundancy**: Don't store the same information repeatedly
8. **Think Long-term**: Store information useful across sessions, not just current conversation

## Notes for Agents

- **Memory is for enhancement**, not replacement of core capabilities
- **Balance storage and retrieval** - don't over-store trivial info
- **Semantic understanding** - SuperMemory uses vector embeddings
- **Cross-session continuity** - memories persist across all conversations
- **User ownership** - users control their memory data completely

By following these guidelines, you'll provide users with a truly personalized, context-aware AI experience that remembers and learns across all their interactions.
