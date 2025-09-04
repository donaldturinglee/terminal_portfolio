import {profile} from "../../config/profile";
import {terminal} from "../../config/terminal";

const TerminalWelcomeMessage = () => {

    const getCommandColor = (command: string) => {
        const colorMap: { [key: string]: string } = {
            'help': 'var(--theme-primary)',
            'neofetch': 'var(--theme-info)',
            'ls': 'var(--theme-success)',
            'cd': 'var(--theme-warning)'
        };
        return colorMap[command] || 'var(--theme-text)';
    };

    return (
        <div style={{
            color: 'var(--theme-text)',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.4',
            padding: '20px'
        }}>
            {/* ASCII Art */}
            <div style={{color: 'var(--theme-primary)', marginBottom: '16px', textAlign: 'center'}}>
                {terminal.ascii.map((line, index) => (
                    <pre key={index} style={{margin: '0', fontSize: '12px'}}>{line}</pre>
                ))}
                <div style={{
                    color: 'var(--theme-muted)',
                    fontSize: '10px',
                    margin: '8px 0 0 0',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    {profile.title}
                </div>
            </div>

            {/* Terminal Content */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '16px'
            }}>
                {/* Left Column - Usages */}
                <div style={{
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        paddingBottom: '6px',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>
                        <pre style={{
                            margin: '0',
                            color: 'var(--theme-warning)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            Usages
                        </pre>
                    </div>

                    <div style={{fontSize: '12px', textAlign: 'left'}}>
                        {terminal.usages.map((usage, index) => (
                            <div key={index} style={{marginBottom: '4px'}}>
                                <span style={{color: 'var(--theme-muted)'}}>$</span>{' '}
                                <span style={{color: getCommandColor(usage.command)}}>{usage.command}</span>
                                <span style={{color: 'var(--theme-muted)'}}> - {usage.description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Tips */}
                <div style={{
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        paddingBottom: '6px',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>
                        <pre style={{
                            margin: '0',
                            color: 'var(--theme-info)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            TIPS
                        </pre>
                    </div>

                    <div style={{fontSize: '12px', textAlign: 'left'}}>
                        {terminal.tips.map((tip, index) => (
                            <div key={index} style={{marginBottom: '4px'}}>
                                <span style={{color: 'var(--theme-warning)'}}>{tip.name}</span>
                                <span> - </span>
                                <span style={{color: 'var(--theme-muted)'}}>{tip.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TerminalWelcomeMessage;