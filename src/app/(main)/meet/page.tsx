import { Coffee } from "lucide-react";

export default function MeetPage() {
  return (
    <div className="flex flex-col items-center text-center py-10 md:py-20">
      <Coffee className="h-12 w-12 text-primary mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        Let's chat over a cup of ☕️
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
        I keep about 1 hour slot free daily for people to reach out to me, chat about anything tech. 
        If you can't find a slot, I'm always an email away.
      </p>
      
      <div className="w-full max-w-2xl space-y-6">
        {/* Embedded Calendly Widget */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Schedule a Meeting</h2>
          <p className="text-muted-foreground mb-4">
            Book a slot for a tech discussion, mentorship, or just to chat about interesting projects.
          </p>
          <div className="w-full flex justify-center">
            <iframe
              src="https://calendly.com/YOUR-CALENDLY-USERNAME" // <-- Replace with your actual Calendly username
              width="100%"
              height="600"
              style={{ border: "none", borderRadius: "8px" }}
              allow="camera; microphone; fullscreen; speaker; display-capture"
              title="Book a meeting"
            ></iframe>
          </div>
        </div>

        {/* Alternative Contact Section */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Connect</h2>
          <p className="text-muted-foreground mb-4">
            Can't find a suitable slot? Feel free to reach out through other channels:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sanchitagarwal0332@gmail.com"
              className="btn btn-outline"
            >
              Send Email
            </a>
            <a
              href="https://linkedin.com/in/sanchitagarwal0332"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Meeting Guidelines</h2>
          <ul className="text-left text-muted-foreground space-y-2">
            <li>• Please be respectful of the time slot you book</li>
            <li>• Come prepared with specific topics or questions</li>
            <li>• Technical discussions are preferred but not mandatory</li>
            <li>• Feel free to discuss projects, career advice, or tech trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 