import "./GeneratorOptions.css"

export default function GeneratorOptions() {
    return (
        <div className="generator-options">
            <div>
                <button id="generate">Generate</button>
                <input type="number" name="size" min="8" max="16" id="size-input" placeholder="10"/>
                <select id="span-input" name="select-input">
                    <option value="Random">Random</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className="generator-options__checks-method">
                <div className="generator-options__checks-method-radio">
                    <input type="radio" id="method-good" name="method" value="good" />
                    <label htmlFor="method-good">Until All Checks Pass</label>
                </div>
                <div className="generator-options__checks-method-radio">
                    <input type="radio" id="method-once" name="method" value="once" />
                    <label htmlFor="method-once">Try Once</label>
                </div>
            </div>
        </div>
    )
}
