# Lecture Transcriber

An automated pipeline for transcribing MBA lecture recordings, generating AI-powered study materials, and managing them in the cloud.

## Overview

This system automatically processes audio recordings from MBA classes by:

- **Transcribing** audio files using OpenAI Whisper
- **Generating** AI-powered study materials (summaries, key concepts, review questions) using Google Gemini
- **Uploading** recordings to Google Drive for cloud storage
- **Storing** transcripts and insights in Supabase for easy access
Designed for hands-off operation with a personal MBA class schedule and automatic lecture-to-course mapping.

## Features

- **Automatic transcription** with OpenAI Whisper (timestamped segments)
- **AI-generated study materials**:
- Main ideas and key concepts (6-8 points)
- Comprehensive summaries (150-250 words)
- Important keywords and terms (12-15)
- Review questions for exam prep (10-12)
- **Smart file detection** - parses audio filenames to extract date/time and map to courses
- **Cloud integration** - Google Drive storage + Supabase database
- **Duplicate prevention** - automatically skips already-processed lectures
- **Interactive confirmations** - review files before processing (or use `-y` for automation)

## Requirements

### System Dependencies

- Python 3.8+
- ffmpeg (required by Whisper for audio processing)

### Python Dependencies

Install via pip:

```bash
pip install openai-whisper google-generativeai supabase google-auth google-api-python-client pydantic pyfiglet tqdm colorama
```

Or from requirements.txt if available:

```bash
pip install -r requirements.txt
```

## Setup

### 1. Environment Variables

Create a `.env` file in the project root:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

### 2. Google Drive Setup

1. Enable Google Drive API in Google Cloud Console
2. Download OAuth credentials and save as `credentials.json` in project root
3. Create `gdrive/folder_ids.json` with your class folder mappings:

```json
{
"MBA 505 Leadership": "your_gdrive_folder_id",
"MBA 530 Operations Management": "your_gdrive_folder_id",
...
}
```

### 3. Supabase Database Schema

Create the following tables in Supabase:

- `lectures` - lecture metadata (id, title, professor, date, class_number, duration)
- `transcript_segments` - timestamped transcript segments
- `lecture_texts` - full transcript text
- `text_insights` - AI-generated study materials
See `db_supabase/db_models.py` for complete schema definitions.

### 4. Lecture Metadata

For each class, create a metadata file at `lecture_metadata/{class_name}/data.json`:

```json
{
"professor": "Professor Name",
"lecture_titles": {
"2025-01-15": "Introduction to Leadership",
"2025-01-22": "Decision Making Under Uncertainty",
...
}
}```

### 5. Class Schedule Configuration

Edit `CLASS_TIME_MAPPINGS` in `local_files/read.py` to match your class schedule:
```python
CLASS_TIME_MAPPINGS = {
0: {  # Monday
(8, 0): 'MBA 505 Leadership',
(9, 30): 'MBA 530 Operations Management',
...
},
...
}
```

## Usage

### Basic Usage

Run the main processing pipeline:

```bash
python main.py
```

This will:

1. Check Supabase for existing transcriptions
2. Scan Google Drive for previously uploaded files
3. Find unprocessed audio files in local directory
4. For each file, prompt for confirmation and then:

- Upload to Google Drive
- Transcribe with Whisper
- Generate AI study materials
- Save everything to Supabase

### Skip Confirmations

For automated/batch processing:

```bash
python main.py -y
# or
python main.py --yes
```

### Audio File Format

Audio files should be named: `YYYYMMDDHHMMSS.WAV`
Example: `20250122093000.WAV` = January 22, 2025 at 9:30 AM
The system will:

- Parse the timestamp from the filename
- Match the day/time to your class schedule
- Load appropriate metadata (professor, lecture title)
- Process and categorize accordingly

## Project Structure

```lecture-transcriber/
├── main.py                      # Main processing pipeline
├── db_supabase/                 # Supabase integration
│   ├── upload.py               # Upload lectures to database
│   ├── read.py                 # Query existing lectures
│   └── db_models.py            # Pydantic data models
├── transcribe/
│   └── transcribe.py           # Whisper transcription processor
├── text_insights/
│   └── process.py              # Gemini AI insights generator
├── gdrive/                      # Google Drive integration
│   ├── upload.py               # Upload audio files
│   └── read.py                 # List Drive files
├── local_files/
│   └── read.py                 # Parse local audio files
├── lecture_metadata/            # Per-class metadata
│   └── {class_name}/
│       └── data.json
└── audio/                       # Local audio storage (gitignored)
```

## How It Works

### 1. File Discovery

Audio files are discovered in the local recording directory. The filename timestamp is parsed and matched against your class schedule to determine the course.

### 2. Transcription

OpenAI Whisper processes the audio file to generate:

- Timestamped transcript segments
- Full transcript text
- Metadata (duration, date, class number)

### 3. AI Analysis

Google Gemini 2.5 Flash analyzes the transcript to generate:

- **Main Ideas**: Key concepts and frameworks discussed
- **Summary**: Comprehensive overview of the lecture
- **Keywords**: Important business/academic terms
- **Review Questions**: Exam-focused questions

### 4. Storage

All data is saved to Supabase and the original audio is uploaded to Google Drive for cloud backup.

## Development

For detailed development documentation, architecture notes, and implementation details, see [CLAUDE.md](CLAUDE.md).

### Testing Individual Components

```python
# Test transcription
from transcribe.transcribe import TranscriptionProcessor
processor = TranscriptionProcessor(SUPABASE_URL, SUPABASE_KEY)
result = processor.run(audio_path, metadata)
# Test text insights
from text_insights.process import TextProcessor
text_processor = TextProcessor(SUPABASE_URL, SUPABASE_KEY)
insights = text_processor.run(lecture_uuid, transcription_text, context)
```

## Troubleshooting

### "File already exists in Supabase"

The system automatically prevents duplicate processing. To reprocess a lecture, delete it from Supabase first (will cascade to all related tables).

### "No matching class found"

Check that the audio file timestamp matches a time in `CLASS_TIME_MAPPINGS`. The system uses end-time truncation to handle recordings that run over.

### Transcription fails

Ensure ffmpeg is installed and accessible. Whisper requires ffmpeg for audio processing.

### Google Drive upload fails

Verify `credentials.json` exists and folder IDs in `folder_ids.json` are correct. You may need to re-authenticate.

## License

Personal project - all rights reserved.
